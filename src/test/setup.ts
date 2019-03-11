process.env.DB_STORE_FILE = './src/test/storefile.db';
process.env.EBAY_APP_ID = 'EBAY_APP_ID';
process.env.EBAY_APP_CERT = 'EBAY_APP_CERT';
process.env.EBAY_API_BROWSE_URL = 'EBAY_API_BROWSE_URL';
process.env.PORT = '3002';

import fs from 'fs';
import sinon from 'sinon';
import * as chai from 'chai';
import request from 'supertest';

export { sinon, chai, request };

export const initServer = function () {
    const router = require('../routes/main')
    const express = require('express');
    const app = express();

    app.use(router.router);

    const server = require('http').createServer(app);
    server.listen(process.env.PORT);
    console.log(`Now listening test server on ${process.env.PORT}`);

    const serverClose = () => {
        server.close();
        console.log(`Close test server connection on ${process.env.PORT}`);
    };

    return { server, serverClose };
};

const pathToDatabase: any = process.env.DB_STORE_FILE;

export const resetTestDB = () => {
    fs.unlinkSync(pathToDatabase);
    fs.openSync(pathToDatabase, 'w');
};

export const deleteTestDB = () => {
    fs.unlinkSync(pathToDatabase);
};
