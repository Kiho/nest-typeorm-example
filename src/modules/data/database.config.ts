import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmDatabaseConfig } from '../database/typeOrm.database.config';

export class DatabaseConfig extends TypeOrmDatabaseConfig {
    protected _dirname: string;

    public getConfiguration(): any {
        const entities =  __dirname + '/../../modules/**/*.entity.ts';        
        const conn = {
            driver: {
                type: process.env.DB_DRIVER,
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            },
            entities: [
                // any entity file under src/modules
                entities
            ],
            autoSchemaSync: true,
        };      
        return conn;
    }
}
