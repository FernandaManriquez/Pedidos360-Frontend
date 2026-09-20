export const environment = {
  production: false,

  azure: {
    clientId: '2c6e6098-aad1-44e7-8372-3b45aa483f24',
    tenantId: '5ddded37-17b6-4cf2-941a-ad189b5b84ac',
    authority: 'https://login.microsoftonline.com/5ddded37-17b6-4cf2-941a-ad189b5b84ac',
    redirectUri: 'http://localhost:4200',

    protectedResourceScopes: [
      'api://d661bceb-0ecd-4b29-ab87-9a8aa17b75db/Pedidos.ReadWrite'
    ]
  },

  apiBaseUrl: 'https://0tf2rrk5b0.execute-api.us-east-1.amazonaws.com/dev'
};