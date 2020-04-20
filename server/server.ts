import { ApplicationConfig } from '@loopback/core';
import express from 'express';
import http from 'http';
import pEvent from 'p-event';
import { LoopbackApplication } from '../dist-api';
const { Nuxt, Builder } = require('nuxt');

export class ExpressServer {
    public readonly app: express.Application;
    public readonly lbApp: LoopbackApplication;
    private server?: http.Server;

    constructor(private options: ApplicationConfig = {}) {
        this.app = express();
        this.lbApp = new LoopbackApplication(options);
        this.app.use('/api', this.lbApp.requestHandler);
    }

    public async nuxtSetup() {
        const nuxt = new Nuxt(this.options)
        await nuxt.ready()
        // Build only in dev mode
        if (this.options.dev) {
            const builder = new Builder(nuxt)
            await builder.build()
        }
        this.app.use(nuxt.render);

    }
    public async boot() {
        await this.nuxtSetup();
        await this.lbApp.boot();
  
    }

    public async start() {
        await this.lbApp.start();
        const port = this.lbApp.restServer.config.port ?? 3000;
        const host = this.lbApp.restServer.config.host ?? '127.0.0.1';
        this.server = this.app.listen(port, host);
        await pEvent(this.server, 'listening');
    }

    public async stop() {
        if (!this.server) return;
        await this.lbApp.stop();
        this.server.close();
        await pEvent(this.server, 'close');
        this.server = undefined;
    }
}