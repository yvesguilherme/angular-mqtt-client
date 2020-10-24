<h1 align="center">Angular v10.2.0 MQTT Client</h1>

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Angular](https://angular.io/start)
- [Angular CLI](https://cli.angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [MQTT.js](https://github.com/mqttjs/MQTT.js)
- [Docker](https://docs.docker.com/get-started/)
- [OTPLIB](https://github.com/yeojz/otplib)
- [Pako](https://github.com/nodeca/pako)
- [jsSHA](http://caligatio.github.com/jsSHA/)

## :package: Instalando as dependências

```bash
# Vá para a para do projeto e instale as dependências com os comandos:
$ cd angular-mqtt-client

$ npm install
```

## 💻 Subindo aplicação local

```bash
# Na pasta do projeto e com o Angular CLI instalado, execute o comando:
$ ng serve -o
```

## :bulb: Utilizando o Docker
```bash
# Certifique-se que tenha o Docker instalado em seu computador, vá para a pasta raiz do projeto e execute o comando:
$ cd angular-mqtt-client

# Builda a imagem com a environment production (padrão).
$ docker build -t angular-mqtt-client:prd .

# Builda a imagem com a environment que passar como parâmetro (dev ou stg).
$ docker build -t angular-mqtt-client:dev --build-arg configuration="dev" .

# Teste sua imagem gerada passando também a environment (dev/stg/prd) como parâmetro.
$ docker run -p 80:80 angular-mqtt-client:dev

# Abra o browser e teste a aplicação.
http://localhost
```

<p align="center">Desenvolvido por Yves Guilherme :rocket:</p>