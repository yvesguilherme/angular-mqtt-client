import { Injectable } from '@angular/core';

import { Deferred } from '../mqtt/promise/deferred';
import { MqttFactory } from '../mqtt/mqtt-factory';

@Injectable({
  providedIn: 'root'
})
export class TesteService {
  private timeout = 30 * 1000;
  private topicos = {
    teste: 'topico/teste'
  };

  constructor() { }

  /** Busca as negociacoes vigente por cliente */
  teste(input: any) {
    return this.realizarRequisicao(this.topicos.teste, input);
  }

  /** Realiza a requisição ao broker (gravity) pelo protocolo MQTT. */
  realizarRequisicao(topico: any, input: any) {
    const deferred = new Deferred();
    const uuid = MqttFactory.gerarUuid();

    MqttFactory.chamada(topico, uuid, input, this.timeout)
      .then((sucesso: any) => deferred.resolve(sucesso))
      .catch((falha: any) => deferred.reject(falha));

    return deferred.promise;
  }
}
