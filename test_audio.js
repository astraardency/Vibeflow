const https = require('https');

const url = "https://aac.saavncdn.com/339/0af8f2fa569f884e1bdb98398a5ad805_320.mp4";

https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
}).on('error', (e) => {
  console.error(e);
});
