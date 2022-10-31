export const environment = {
	production: true,
	google_oidc_config: {
		clientId: '514739382536-2keit72t0nfuuvlvcni1gn03lmij0htq.apps.googleusercontent.com',
		issuer: 'https://accounts.google.com',
		scope: 'openid profile email',
		redirectUri: 'https://talkart.io',
		strictDiscoveryDocumentValidation: false,
		useSilentRefresh: false,
		logoutUrl: 'https://www.google.com/accounts/logout'
	},
	baseURL: 'https://talkart.io/api',
	appName: 'Talk Art'
};
