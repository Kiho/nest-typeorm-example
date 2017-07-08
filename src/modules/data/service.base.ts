import { Component, OnModuleInit } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeOrm.database.service';
import { Repository } from 'typeorm';
import { Service, IService } from '../database/service.interface';
import { IEntity, EntityType } from './entity.interface';

export class ServiceBase<T extends IEntity> implements Service<T>, IService {

    public name: EntityType;

    /**
     * Simple constructor - notice the injection of the TypeOrmDatabaseService instance.
     *
     * For example purposes, the constructor is calling a simple seed method which creates some entries in the database
     * for us if none exist.
     *
     * @param databaseService
     */
    constructor(protected databaseService: TypeOrmDatabaseService, public entityType) {
        this.name = this.entityType.name.toLowerCase();
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
    public async seed() {
        const entitiesRepository = await this.repository;
        let count = await entitiesRepository.count();
        if (count == 0) {
            const seedData = this.getSeedData();
            console.log('Seed Entities.', this.entityType.name);
            const entities = await entitiesRepository.persist(seedData);
            // const entities = await this.databaseService.saveTransaction(seedData);
            console.log('Seeded Entities.', this.entityType.name);
            // console.log(entities);
        }
    }

    protected getSeedData(): T[] {
        return [];
    }

    // C
    public async add(item: T): Promise<T> {
        if (item.id !== undefined && item.id == 0) {
            delete item.id;
        }
        // console.log('add', this.entityType, item);
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
        // console.log('update', this.entityType, item);
        return (await this.repository).persist(item);
    }

    // D
    public async remove(item: T): Promise<T> {
        return (await this.repository).remove(item);
    }
}