import { MqttService } from './mqtt-service';
import { Deferred } from './promise/deferred';

/** Configurações. */
import { CONFIGURACOES_MQTT } from './config/configuracoes';

/** UUID - @see https://github.com/uuidjs/uuid */
import { v4 as uuidV4 } from 'uuid';

export class MqttFactory {
  static msFactory: any = {};

  constructor() { }

  /** Gera o UUID na versão 4. */
  public static gerarUuid() {
    return uuidV4();
  }

  public static chamada(topico, uuid, parametrosRequisicao, timeout, onMessage?, manterConexao = false) {
    const deferred = new Deferred();

    if (!onMessage) {
      onMessage = function (topico, result) {
        console.log(topico);
        console.log(result);

        if (CONFIGURACOES_MQTT.habilitarTopicosSucessoFalha) {
          if (topico.indexOf(CONFIGURACOES_MQTT.topicoFalha) === -1) {
            deferred.resolve(result);
          } else {
            deferred.reject(result);
          }
        } else {
          if (result === 'timeout') {
            deferred.reject(result);
          } else {
            deferred.resolve(result);
          }
        }
      };
    }

    MqttService.subscribe(topico, uuid, onMessage.bind(this), manterConexao);
    MqttService.publish(parametrosRequisicao, topico, uuid, timeout);

    return deferred.promise;
  }

  public static fecharConexao() {
    MqttService.close();
    localStorage.clear();
  }
}
