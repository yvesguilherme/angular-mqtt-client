import { Injectable } from '@angular/core';

/** Configurações. */
import { CONFIGURACOES_MQTT } from './config/configuracoes';

/** Environment. */
import { environment } from 'src/environments/environment';

/** MQTT - https://www.npmjs.com/package/mqtt */
import * as mqtt from 'mqtt';

/** HI BASE 32 - https://www.npmjs.com/package/hi-base32 */
import { encode } from 'hi-base32';

/** OTPLIB - https://github.com/yeojz/otplib */
declare var otplib: any;

/** HMAC (SHA-1) - https://caligatio.github.io/jsSHA/ */
declare var jsSHA: any;

/** PAKO - http://nodeca.github.io/pako/ */
declare var pako: any;

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  static mqttService: any = {};

  public static abrirConexao(clientId: number) {
    if (!MqttService.mqttService.client) {
      MqttService.mqttService.clientId = `${clientId}-${Math.floor((Math.random() * 999999999) + 1)}`;
      MqttService.mqttService.mqtt = mqtt;
      MqttService.mqttService.host = environment.mqtt.host;
      MqttService.mqttService.port = environment.mqtt.port;
      MqttService.mqttService.listaOnMessage = [];
      MqttService.mqttService.listaManterConexao = [];
      MqttService.mqttService.listaTimeout = {};
      MqttService.conectar();
    }
  }

  public static conectar() {
    const opcoesConexao = {
      clientId: MqttService.mqttService.clientId,
      protocol: environment.mqtt.protocol,
      host: MqttService.mqttService.host,
      port: MqttService.mqttService.port,
      path: '/mqtt',
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 2000,
      rejectUnauthorized: false,
      keepalive: 50
    };

    MqttService.mqttService.client = MqttService.mqttService.mqtt.connect(opcoesConexao);

    MqttService.mqttService.client.on('connect', function (): any {
      console.warn('Client conectado');
    }.bind(MqttService.mqttService));

    MqttService.mqttService.client.on('close', function (): any {
      console.warn('Client desconectado');
    });

    MqttService.mqttService.client.on('message', function (topico, message): any {

      const uuid = MqttService.pegarUuid(topico);

      const funcao = MqttService.mqttService.listaOnMessage[uuid];
      funcao(topico, MqttService.analisarResultado(message));

      if (!MqttService.mqttService.listaManterConexao[uuid]) {
        delete MqttService.mqttService.listaOnMessage[uuid];

        if (MqttService.mqttService.listaTimeout[uuid]) {
          clearTimeout(MqttService.mqttService.listaTimeout[uuid]);
          delete MqttService.mqttService.listaTimeout[uuid];
        }

        MqttService.mqttService.client.unsubscribe(topico);

        if (CONFIGURACOES_MQTT.habilitarTopicosSucessoFalha) {
          let index = topico.indexOf(CONFIGURACOES_MQTT.topicoFalha);
          if (index > 0) {
            const subTopico = `${topico.slice(0, index)}${CONFIGURACOES_MQTT.topicoSucesso}${topico.slice(index + 7)}`;
            MqttService.mqttService.client.unsubscribe(subTopico);
          } else {
            index = topico.lastIndexOf(CONFIGURACOES_MQTT.topicoSucesso);
            const subTopico = `${topico.slice(0, index)}${CONFIGURACOES_MQTT.topicoFalha}/${topico.slice(index + 8)}`;
            MqttService.mqttService.client.unsubscribe(subTopico);
          }
        }
      }
    }.bind(MqttService.mqttService));
  }

  public static subscribe(topico, uuid, onMessage, manterConexao) {
    if (!topico || !uuid || !onMessage) {
      return false;
    }

    if (manterConexao) {
      MqttService.mqttService.listaManterConexao[uuid] = true;
    }

    MqttService.mqttService.listaOnMessage[uuid] = onMessage;

    if (CONFIGURACOES_MQTT.habilitarTopicosSucessoFalha) {
      MqttService.mqttService.client.subscribe(
        MqttService.retornarTopicoSucessoUuid(topico, uuid)
      );

      MqttService.mqttService.client.subscribe(
        MqttService.retornarTopicoFalhaUuid(topico, uuid)
      );
    } else {
      MqttService.mqttService.client.subscribe(`${topico}/${uuid}`);
    }
  }

  public static publish(parametrosRequisicao, topico, uuid, timeout) {
    if (!MqttService.mqttService.client) {
      return false;
    }

    if (timeout) {
      MqttService.mqttService.listaTimeout[uuid] = setTimeout(function (): any {

        if (CONFIGURACOES_MQTT.habilitarTopicosSucessoFalha) {
          MqttService.mqttService.client.unsubscribe(MqttService.retornarTopicoSucessoUuid(topico, uuid));

          MqttService.mqttService.client.unsubscribe(MqttService.retornarTopicoFalhaUuid(topico, uuid));

          MqttService.mqttService.listaOnMessage[uuid](MqttService.retornarTopicoFalhaUuid(topico, uuid), 'timeout');
        } else {
          MqttService.mqttService.client.unsubscribe(`${topico}/${uuid}`);

          MqttService.mqttService.listaOnMessage[uuid](`${topico}/${uuid}`, 'timeout');
        }
      }.bind(MqttService.mqttService), timeout);
    } else {
      timeout = 0;
    }

    const apiKey = `MQTT-CLIENT-WEB-${Math.floor((Math.random() * 999999999) + 1)}`;
    const secret = encode(`${apiKey}${topico}`);
    const signature = '';

    otplib.authenticator.options = {
      step: 600, // Tempo em segundos.
      digits: 6
    };

    const token = otplib.authenticator.generate(secret);

    try {
      otplib.authenticator.check(token, secret);
    } catch (error) {
      throw new Error(`Erro ao gerar o token: ${error}`);
    }

    const objetoRequisicao: any = {
      meta: {
        uuid
      },
      header: {
        apiKey,
        signature,
        nonce: parseInt(token, 10)
      },
      envelope: {
        parametrosRequisicao,
        timeout
      }
    };

    try {
      const objHmac = new jsSHA('SHA-1', 'TEXT');

      objHmac.setHMACKey(apiKey, 'TEXT');
      objHmac.update(`${topico}${JSON.stringify(objetoRequisicao.envelope)}`);
      objetoRequisicao.header.signature = objHmac.getHMAC('HEX');
    } catch (error) {
      throw new Error(`Erro ao gerar o signature: ${error}`);
    }

    MqttService.mqttService.client.publish(topico, JSON.stringify(objetoRequisicao), { qos: 2 });
  }

  static retornarTopicoSucessoUuid(topico, uuid) {
    return `${topico}/${CONFIGURACOES_MQTT.topicoSucesso}/${uuid}`;
  }

  static retornarTopicoFalhaUuid(topico, uuid) {
    return `${topico}/${CONFIGURACOES_MQTT.topicoFalha}/${uuid}`;
  }

  public static close() {
    if (MqttService.mqttService) {
      MqttService.mqttService.client.end();
      delete MqttService.mqttService.client;
    }

    // tslint:disable-next-line: forin
    for (const key in MqttService.mqttService.listaTimeout) {
      clearTimeout(MqttService.mqttService.listaTimeout[key]);
    }
  }

  static analisarResultado(mensagem: any) {
    let resposta: any;

    // tslint:disable-next-line: no-bitwise
    const bytesDaMensagem = mensagem[0] & 0xff | ((mensagem[1] << 8) & 0xff00);

    if ((bytesDaMensagem === 0x8b1f)) {
      resposta = pako.inflate(mensagem, { to: 'string' });
    } else {
      resposta = `${mensagem}`;
    }

    try {
      resposta = JSON.parse(resposta.replace('\n', ''));
      if (resposta?.[CONFIGURACOES_MQTT.objetoRespostaBackEnd]) {
        if (resposta[CONFIGURACOES_MQTT.objetoRespostaBackEnd][CONFIGURACOES_MQTT.objetoArrayInternoRespostaBackEnd]) {
          return resposta[CONFIGURACOES_MQTT.objetoRespostaBackEnd][CONFIGURACOES_MQTT.objetoArrayInternoRespostaBackEnd];
        }
        return resposta[CONFIGURACOES_MQTT.objetoRespostaBackEnd];
      }
    } catch (error) {
      return 'Resposta inválida do back-end!';
    }
    return null;
  }

  static pegarUuid(topico) {
    return topico.substring(topico.lastIndexOf('/') + 1);
  }
}
