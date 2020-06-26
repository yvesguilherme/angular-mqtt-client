// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.stg.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mqtt: {
    protocol: 'wss',
    host: 'mqtt.eclipse.org',
    port: '1883'
  },
};