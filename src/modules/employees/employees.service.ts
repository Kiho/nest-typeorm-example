import { Component } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeOrm.database.service';
import { Employee } from './employee.entity';

import { ServiceBase } from '../data/service.base';

@Component()
export class EmployeesService extends ServiceBase<Employee> {

    constructor(databaseService: TypeOrmDatabaseService) {
        super(databaseService, Employee);

        this.seed();
    }

    protected getSeedData(): Employee[] {
        return [new Employee('John Doe', 30, 'A', 0, 0), new Employee('Jane Doe', 40, 'B', 0, 0)];
    }
}
