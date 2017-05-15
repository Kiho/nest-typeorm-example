import { Component } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeOrm.database.service';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { Service } from '../database/service.interface';

@Component()
export class EmployeesService implements Service<Employee> {

    /**
     * Simple constructor - notice the injection of the TypeOrmDatabaseService instance.
     *
     * For example purposes, the constructor is calling a simple seed method which creates some entries in the database
     * for us if none exist.
     *
     * @param databaseService
     */
    constructor(private databaseService: TypeOrmDatabaseService) {
        //noinspection JSIgnoredPromiseFromCall
        this.seed();
    }

    /**
     * Internal async getter for the Employee Repository - `getRepository()` is async because it may need to connect.
     * @returns {Promise<Repository<Employee>>}
     */
    private get repository(): Promise<Repository<Employee>> {
        return this.databaseService.getRepository(Employee);
    }

    /**
     * Adds entries to the database for easier example usage without needing to call add() before doing a get()
     *
     * :)
     *
     * @returns {Promise<void>}
     */
    private async seed() {
        const employeesRepository = await this.repository;
        let count = await employeesRepository.count();
        if(count == 0) {
            const employees = await employeesRepository.persist([new Employee('John Doe', 30), new Employee('Jane Doe', 40)]);
            console.log('Seeded Employees.');
            console.log(employees);
        }
    }

    // C
    public async add(employee: Employee): Promise<Employee> {
        return (await this.repository).persist(employee);
    }

    public async addAll(employees: Employee[]): Promise<Employee[]> {
        return (await this.repository).persist(employees);
    }

    // R
    public async getAll(): Promise<Employee[]> {
        return (await this.repository).find();
    }

    public async get(id: number): Promise<Employee> {
        return (await this.repository).findOneById(id);
    }

    // U
    public async update(employee: Employee): Promise<Employee> {
        return (await this.repository).persist(employee);
    }

    // D
    public async remove(employee: Employee): Promise<Employee> {
        return (await this.repository).remove(employee);
    }
}