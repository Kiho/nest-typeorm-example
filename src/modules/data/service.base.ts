import { Component } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeOrm.database.service';
import { Repository } from 'typeorm';
import { Service } from '../database/service.interface';
import { IEntity } from './entity.interface';

@Component()
export class ServiceBase<T extends IEntity> implements Service<T> {

    /**
     * Simple constructor - notice the injection of the TypeOrmDatabaseService instance.
     *
     * For example purposes, the constructor is calling a simple seed method which creates some entries in the database
     * for us if none exist.
     *
     * @param databaseService
     */
    constructor(protected databaseService: TypeOrmDatabaseService, private entityType) {
        //noinspection JSIgnoredPromiseFromCall
        this.seed();
    }

    /**
     * Internal async getter for the Entity Repository - `getRepository()` is async because it may need to connect.
     * @returns {Promise<Repository<Entity>>}
     */
    private get repository(): Promise<Repository<T>> {
        return this.databaseService.getRepository(this.entityType);
    }

    /**
     * Adds entries to the database for easier example usage without needing to call add() before doing a get()
     *
     * :)
     *
     * @returns {Promise<void>}
     */
    protected async seed() {
        const entitiesRepository = await this.repository;
        let count = await entitiesRepository.count();
        if(count == 0) {
            const entities = await entitiesRepository.persist(this.getSeedData());
            console.log('Seeded Entities.');
            console.log(entities);
        }
    }

    protected getSeedData(): T[] {
        return [];
    }

    // C
    public async add(item: T): Promise<T> {
        return (await this.repository).persist(item);
    }

    public async addAll(list: T[]): Promise<T[]> {
        return (await this.repository).persist(list);
    }

    // R
    public async getAll(): Promise<T[]> {
        return (await this.repository).find();
    }

    public async get(id: number): Promise<T> {
        return (await this.repository).findOneById(id);
    }

    // U
    public async update(item: T): Promise<T> {
        return (await this.repository).persist(item);
    }

    // D
    public async remove(item: T): Promise<T> {
        return (await this.repository).remove(item);
    }
}