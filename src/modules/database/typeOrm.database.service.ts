import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { createConnection, Connection, EntityManager, Repository, ObjectType, Entity } from 'typeorm';
import { TypeOrmDatabaseConfig } from './typeOrm.database.config';

@Component()
export class TypeOrmDatabaseService {

    /**
     * A Connection reference which is reused by all consumers of the database service
     */
    private _connection: Connection;

    public async createConnection(): Promise<Connection> {
        console.log('start: createConnection');
        return createConnection(this.databaseConfig.getConfiguration()).then(connection => {
            this._connection = connection;        
            console.log('done: createConnection');
            return connection;
        }).catch(error => {
            console.log('error: createConnection', error);
            throw error;
        });
    }    

    /**
     * Abstract injection so it is possible to use several databases
     * @param databaseConfig
     */
    constructor(private readonly databaseConfig: TypeOrmDatabaseConfig) {
        // this.createConnection();
    }

    /**
     * An async getter for the Connection which creates the connection if needed.
     * @returns {Promise<Connection>}
     */
    public get Connection(): Promise<Connection> {           
        // return the connection if it's been created already
        if (this._connection) 
            return Promise.resolve(this._connection);
        console.warn('Connection(): connection was not created');
        return null;
    }

    /**
     * An async getter for the entity manager.
     *
     * Connects to the database if needed and returns a reference to the EntityManager
     * @returns {Promise<EntityManager>}
     */
    public async getEntityManager(): Promise<EntityManager> {
        return (await this.Connection).entityManager;
    }

    /**
     * An async getter for repositories.
     *
     * Connects to the database if needed and returns a reference to a Repository for the specified Entity
     * @param entityClassOrName
     * @returns {Promise<Repository<T>>}
     */
    public async getRepository<T>(entityClassOrName: ObjectType<T> | string): Promise<Repository<T>> {
        return (await this.Connection).getRepository<T>(entityClassOrName);
    }
}