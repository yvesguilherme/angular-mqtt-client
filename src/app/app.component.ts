import { Component, OnInit } from '@angular/core';

import { MqttService } from './core/services/mqtt/mqtt-service';

@Component({
  selector: 'mqtt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-mqtt-client';

  constructor() {

    /**
     * Abre uma conexão com o broker.
     * Da forma que foi implementada a service,
     * esta conexão ocorrerá apenas uma única vez
     * durante o ciclo de vida da aplicação.
     */
    MqttService.abrirConexao(new Date().getTime());
  }

  ngOnInit(): void {}
}
