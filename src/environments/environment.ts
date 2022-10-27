// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	google_oidc_config: {
		clientId: '601653797159-p2raa8mrfotcorb6jh3jd8sj4ab0c7jr.apps.googleusercontent.com',
		issuer: 'https://accounts.google.com',
		scope: 'openid profile email',
		redirectUri: 'http://localhost:4200',
		strictDiscoveryDocumentValidation: false,
		useSilentRefresh: false,
		logoutUrl: 'https://www.google.com/accounts/logout'
	},
	baseURL: '/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
