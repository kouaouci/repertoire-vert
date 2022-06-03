// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Proxy to bypass cors problem on login server
  proxyUrl:
    "https://agile-tor-83541.herokuapp.com/https://www.repertoirevert.org/",
  authApiUrl:
    "https://agile-tor-83541.herokuapp.com/https://gaea21user.sustlivprogram.org/apictrl/",
  //authApiUrl: 'https://www.repertoirevert.org/api/'

  // Repertoire vert url /
  url: "https://www.repertoirevert.org",
  // url: 'https://dev.repertoirevert.org/',
  //url: 'https://localhost:8000/',

  // Geocodeapi
  geocodeApiUrl: "https://app.geocodeapi.io/api/v1/",
  geocodeApiKey: "b79a8300-51c4-11ec-a577-7de9f32705ba",
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
