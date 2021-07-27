// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiBaseUrl: 'http://localhost:8001/api/',
  apiBaseUrl: 'https://merchant-api-development.onepay.lk/api/',
  //apiBaseUrl: 'https://merchant-api-live-v2.onepay.lk/api/',
  aws: 'https://onepayserviceimages.s3.amazonaws.com/',
  socket_url: 'wss://merchant-api-uat.onepay.lk/ws/onepay/',
};


// apiBaseUrl: 'https://merchant-api-live.onepay.lk/api/',
//   aws:'https://onepayserviceimages.s3.amazonaws.com/',
//   socket_url: "wss://merchant-api-live.onepay.lk/ws/onepay/"

// apiBaseUrl: 'http://merchant-uat.onepay.lk/api/',
//   aws:'https://onepayserviceimages.s3.amazonaws.com/',
//   socket_url: 'wss://merchant-uat.onepay.lk/ws/onepay/'

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
