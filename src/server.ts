import { NestFactory } from 'nest.js';
import {ApplicationModule} from "./modules/application/application.module";

// import reflect for TypeORM
import "reflect-metadata";

// middleware imports
import express = require('express');
import * as bodyParser from 'body-parser';

// configure middleware on express instance
const expressInstance = express();
expressInstance.use(bodyParser.json());

const app = NestFactory.create(ApplicationModule, expressInstance);
app.listen(
    process.env.PORT,
    () => {
        console.log(`Application is listening on port ${process.env.PORT}.`);
    }
);