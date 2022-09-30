<h1 align="center">Angular v14.2.3 MQTT Client</h1>

## :rocket: Technologies

This project was developed with the following technologies:

- [Angular](https://angular.io/start)
- [Angular CLI](https://cli.angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [MQTT.js](https://github.com/mqttjs/MQTT.js)
- [Docker](https://docs.docker.com/get-started/)
- [OTPLIB](https://github.com/yeojz/otplib)
- [Pako](https://github.com/nodeca/pako)
- [jsSHA](http://caligatio.github.com/jsSHA/)

## :package: Installing dependencies

```bash
# Go to the project folder and install the dependencies with the commands below:
$ cd angular-mqtt-client

$ npm install
```

## 💻 Running the local application

```bash
# In the project folder and with the Angular CLI installed, run the command below:
$ ng serve -o
```

## :bulb: Using Docker
```bash
# Make sure Docker is installed on your computer, go to the root folder of your project and run the command below:
$ cd angular-mqtt-client

# Run the build with the production environment.
$ docker build -t angular-mqtt-client:prd .

# Run the build with the environment passed as parameter (dev | stg).
$ docker build -t angular-mqtt-client:dev --build-arg configuration="dev" .

# Testing the generated image.
$ docker run -p 80:80 angular-mqtt-client:dev

# Open your browser and browse the application.
http://localhost
```

<p align="center">Developed by Yves Guilherme Lopo R. Lima :rocket:</p>