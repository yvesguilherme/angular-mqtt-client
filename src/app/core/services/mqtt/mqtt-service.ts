import { Injectable } from '@angular/core';

/** Environment */
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

  public static abrirConexao(clientId) {
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

    MqttService.mqttService.client.on('message', function (topic, message): any {

      const uuid = MqttService.pegarUuid(topic);

      const funcao = MqttService.mqttService.listaOnMessage[uuid];
      funcao(topic, MqttService.parseResult(message));

      if (!MqttService.mqttService.listaManterConexao[uuid]) {
        delete MqttService.mqttService.listaOnMessage[uuid];

        if (MqttService.mqttService.listaTimeout[uuid]) {
          clearTimeout(MqttService.mqttService.listaTimeout[uuid]);
          delete MqttService.mqttService.listaTimeout[uuid];
        }

        MqttService.mqttService.client.unsubscribe(topic);

        let index = topic.indexOf('failure');
        if (index > 0) {
          const subTopic = `${topic.slice(0, index)}success${topic.slice(index + 7)}`;
          MqttService.mqttService.client.unsubscribe(subTopic);
        } else {
          index = topic.lastIndexOf('success');
          const subTopic = `${topic.slice(0, index)}failure/${topic.slice(index + 8)}`;
          MqttService.mqttService.client.unsubscribe(subTopic);
        }
      }
    }.bind(MqttService.mqttService));
  }

  public static subscribe(topic, uuid, onMessage, manterConexao, escutar = false) {
    if (!topic) {
      return false;
    }

    if (!uuid) {
      return false;
    }

    if (!onMessage) {
      return false;
    }

    if (manterConexao) {
      MqttService.mqttService.listaManterConexao[uuid] = true;
    }

    MqttService.mqttService.listaOnMessage[uuid] = onMessage;

    if (escutar) {
      MqttService.mqttService.client.subscribe(topic);
    } else {
      MqttService.mqttService.client.subscribe(`${topic}/response/success/${uuid}`);
      MqttService.mqttService.client.subscribe(`${topic}/response/failure/${uuid}`);
    }
  }

  public static unsubscribe(topic, uuid) {
    MqttService.mqttService.client.unsubscribe(`${topic}/response/success/${uuid}`);
    MqttService.mqttService.client.unsubscribe(`${topic}/response/failure/${uuid}`);
  }

  public static publish(input, topic, uuid, timeout) {
    if (!MqttService.mqttService.client) {
      return false;
    }

    const topicoSucesso = `${topic}/response/success/${uuid}`;
    const topicoFalha = `${topic}/response/failure/${uuid}`;

    if (timeout) {
      MqttService.mqttService.listaTimeout[uuid] = setTimeout(function (): any {
        MqttService.mqttService.client.unsubscribe(topicoSucesso);
        MqttService.mqttService.client.unsubscribe(topicoFalha);
        MqttService.mqttService.listaOnMessage[uuid](topicoFalha, 'timeout');
      }.bind(MqttService.mqttService), timeout * 1.5);
    } else {
      timeout = 0;
    }

    const apiKey = `MQTT-CLIENT-WEB-${Math.floor((Math.random() * 999999999) + 1)}`;
    const secret = encode(`${apiKey}${topic}`);
    const signature = '';

    otplib.authenticator.options = {
      step: 600, // Tempo em segundos.
      digits: 6
    };

    const token = otplib.authenticator.generate(secret);

    try {
      otplib.authenticator.check(token, secret);
    } catch (error) {
      console.error(`Erro ao gerar o token: ${error}`);
    }

    const payload: any = {
      meta: {
        uuid
      },
      header: {
        apiKey,
        signature,
        nonce: parseInt(token, 10)
      },
      envelope: {
        input,
        timeout
      }
    };

    try {
      const objHmac = new jsSHA('SHA-1', 'TEXT');

      objHmac.setHMACKey(apiKey, 'TEXT');
      objHmac.update(`${topic}${JSON.stringify(payload.envelope)}`);
      payload.header.signature = objHmac.getHMAC('HEX');
    } catch (error) {
      console.error(`Erro ao gerar o signature: ${error}`);
    }

    MqttService.mqttService.client.publish(topic, JSON.stringify(payload), { qos: 2 });
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

  static parseResult(mensagem: any) {
    let resposta: any;

    // tslint:disable-next-line: no-bitwise
    const bytesDaMensagem = mensagem[0] & 0xff | ((mensagem[1] << 8) & 0xff00);

    if ((bytesDaMensagem === 0x8b1f)) {
      resposta = pako.inflate(mensagem, { to: 'string' });
    } else {
      resposta = `${mensagem}`;
    }

    /**
     * Verificar como está a resposta no envelope do micro-serviço.
     * Para este exemplo é: envelope { result: []}
     */
    try {
      resposta = JSON.parse(resposta.replace('\n', ''));
      if (resposta && resposta.envelope) {
        if (resposta.envelope.result) {
          return resposta.envelope.result;
        }
        return resposta.envelope;
      }
    } catch (error) {
      return 'Resposta inválida do micro-serviço!';
    }
    return null;
  }

  static pegarUuid(topic) {
    return topic.substring(topic.lastIndexOf('/') + 1);
  }
}
