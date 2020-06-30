import { Injectable } from '@angular/core';

/** MQTT */
import { Deferred } from '../mqtt/promise/deferred';
import { MqttFactory } from '../mqtt/mqtt-factory';

@Injectable({
  providedIn: 'root'
})
export class ExemploService {

  private timeout = 30 * 1000;
  private topicos = {
    exemploTopico: 'api/topico/exemplo/teste'
  };

  constructor() { }

  /** Método que será chamado por quem implementar esta service. */
  fazerRequisicaoAoBroker(input: any) {
    return this.realizarRequisicao(this.topicos.exemploTopico, input);
  }

  /** Realiza a requisição ao broker. */
  private realizarRequisicao(topico: any, input: any) {
    const deferred = new Deferred();
    const uuid = MqttFactory.gerarUuid();

    MqttFactory.chamada(topico, uuid, input, this.timeout)
      .then((sucesso: any) => deferred.resolve(sucesso))
      .catch((falha: any) => deferred.reject(falha));

    return deferred.promise;
  }
}
