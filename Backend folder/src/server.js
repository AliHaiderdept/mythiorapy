const env = require('./config/env');
const createApp = require('./app');

createApp().then((app) => {
  app.listen(env.port, () => console.log(`Mythiorapy API listening on http://localhost:${env.port}`));
}).catch((error) => {
  console.error('Unable to start API:', error.message);
  process.exit(1);
});
