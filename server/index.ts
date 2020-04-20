
import {ExpressServer} from './server';
const consola = require('consola')
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

export async function main() {
  const server = new ExpressServer(config);
  await server.boot();
  await server.start();
  const url = server.lbApp.restServer.url;
  consola.ready({
    message:`Server is running at ${url}`,
    badge: true
  })
}


main().catch( e=> consola.error(e));
