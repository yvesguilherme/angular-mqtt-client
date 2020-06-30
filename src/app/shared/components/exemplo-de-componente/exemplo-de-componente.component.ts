import { Component, OnInit } from '@angular/core';

/** MQTT */
import { ExemploService } from 'src/app/core/services/exemplo/exemplo.service';

@Component({
  selector: 'mqtt-exemplo-de-componente',
  templateUrl: './exemplo-de-componente.component.html',
  styleUrls: ['./exemplo-de-componente.component.scss']
})
export class ExemploDeComponenteComponent implements OnInit {

  constructor(private serviceExemplo: ExemploService) { }

  ngOnInit(): void {
    this.chamarMetodoServiceExemplo();
  }

  /** Exemplo de chamada ao método da service.
   *  Se houver resposta: Then() responderá.
   *  Se houver falha: Catch() responderá.
   */
  chamarMetodoServiceExemplo() {
    const input = {
      objetoTeste: {
        name: 'Yves',
        lastName: 'Guilherme'
      }
    };

    this.serviceExemplo.fazerRequisicaoAoBroker(input)
      .then((resposta: any) => console.log(resposta))
      .catch((falha: any) => console.error(falha));
  }

}
