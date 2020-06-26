import { Component, OnInit } from '@angular/core';

import { TesteService } from '../app/core/services/teste/teste.service';
import { MqttService } from './core/services/mqtt/mqtt-service';

@Component({
  selector: 'mqtt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-mqtt-client';

  constructor(private testService: TesteService) {
    MqttService.abrirConexao(new Date().getTime());
  }

  ngOnInit(): void {
    this.teste2();
  }

  teste2() {
    const input = {
      teste: {
        nome: 'Yves'
      }
    };

    this.testService.teste(input)
      .then((resposta: any) => console.log(resposta))
      .catch((falha: any) => console.error(falha));
  }
}
