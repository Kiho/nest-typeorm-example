import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { createConnection, Connection, EntityManager, Repository, ObjectType, Entity } from 'typeorm';
import { TypeOrmDatabaseConfig } from './typeOrm.database.config';

function delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
            setTimeout(() => {
                resolve(count);
            }, milliseconds);
        });
}

@Component()
export class TypeOrmDatabaseService {

    /**
     * A Connection reference which is reused by all consumers of the database service
     */
    private _connection: Connection;

    private _pending = false;

    /**
     * Abstract injection so it is possible to use several databases
     * @param databaseConfig
     */
    constructor(private readonly databaseConfig: TypeOrmDatabaseConfig) {}

    /**
     * An async getter for the Connection which creates the connection if needed.
     * @returns {Promise<Connection>}
     */
    public async getConnection(): Promise<Connection> {
        console.log('start: getConnection');

        if (this._pending) {
            // Need to wait untill previous call is resolved, otherwise will throw transaction error
            for (let i = 0; i < 100; i++) {
                if (!this._pending){
                    break;
                }
                // await is converting Promise<number> into number
                const count:number = await delay(100, i);
                console.log('delay', count);
            }
        }

        if (this._connection) {            
            console.log('resolve: getConnection');            
            return Promise.resolve(this._connection);
        }

        this._pending = true;
        console.log('set pending: createConnection');
        return createConnection(this.databaseConfig.getConfiguration()).then(connection => {
            this._connection = connection;
            this._pending = false;          
            console.log('done: createConnection');
            return connection;
        }).catch(error => {
            this._pending = false;
            console.log('error: createConnection', error);
            throw error;
        });
    }

    /**
     * An async getter for the entity manager.
     *
     * Connects to the database if needed and returns a reference to the EntityManager
     * @returns {Promise<EntityManager>}
     */
    public async getEntityManager(): Promise<EntityManager> {
        return (await this.getConnection()).entityManager;
    }

    /**
     * An async getter for repositories.
     *
     * Connects to the database if needed and returns a reference to a Repository for the specified Entity
     * @param entityClassOrName
     * @returns {Promise<Repository<T>>}
     */
    public async getRepository<T>(entityClassOrName: ObjectType<T> | string): Promise<Repository<T>> {
        return (await this.getConnection()).getRepository<T>(entityClassOrName);
    }
}