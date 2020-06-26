import { MqttService } from './mqtt-service';
import { Deferred } from './promise/deferred';

export class MqttFactory {
  static msFactory: any = {};

  constructor() { }

  /**
   * Gera o UUID
   */
  public static gerarUuid() {
    return [MqttFactory.gen(2), MqttFactory.gen(1), MqttFactory.gen(1), MqttFactory.gen(1), MqttFactory.gen(3)].join('-');
  }

  /**
   * Função que calcula o UUID
   */
  private static gen(count: number) {
    let out = '';

    for (let index = 0; index < count; index++) {
      // tslint:disable-next-line: no-bitwise
      out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return out;
  }

  public static chamada(topic, uuid, input, timeout, onMessage?, manterConexao = false) {
    const deferred = new Deferred();

    /**
     * Verificar a implementação de tópicos do micro-serviço.
     * Para esta factory foi utilizado .../failure/...
     */
    if (!onMessage) {
      onMessage = function (topic, result) {
        console.log(topic);
        console.log(result);

        if (topic.indexOf('failure') === -1) {
          deferred.resolve(result);
        } else {
          deferred.reject(result);
        }
      };
    }

    MqttService.subscribe(topic, uuid, onMessage.bind(this), manterConexao);
    MqttService.publish(input, topic, uuid, timeout);

    return deferred.promise;
  }

  public static escuta(topic, uuid, onMessage?) {
    const deferred = new Deferred();

    if (!onMessage) {
      onMessage = function (topic, result) {
        console.log(topic);
        console.log(result);

        deferred.resolve(result);
      };
    }

    MqttService.subscribe(topic, uuid, onMessage.bind(this), true, true);

    return deferred.promise;
  }

  public static fecharConexao() {
    MqttService.close();
    localStorage.clear();
  }
}
