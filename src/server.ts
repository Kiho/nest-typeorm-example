import { NestFactory } from '@nestjs/core';
import {ApplicationModule } from './modules/application/application.module';

// import reflect for TypeORM
import 'reflect-metadata';

// middleware imports
import express = require('express');
import * as bodyParser from 'body-parser';
import { ValidatorPipe } from './modules/common/validator.pipe';

// configure middleware on express instance
const expressInstance = express();
expressInstance.use(bodyParser.json());

require('dotenv').config({path: './dev.env'});

const app = NestFactory.create(ApplicationModule, expressInstance);
app.useGlobalPipes(new ValidatorPipe());
app.listen(
    process.env.PORT,
    () => {
        console.log(`Application is listening on port ${process.env.PORT}.`);
    }
);