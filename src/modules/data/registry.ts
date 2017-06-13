import { Component } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeOrm.database.service';
import { IService } from '../database/service.interface';
import { ServiceLocator } from './service.locator';

import { EmployeesService } from '../employees/employees.service';
import { DepartmentsService } from '../employees/departments.service';

const loc = new ServiceLocator();

@Component()
export class Registry {
    constructor(private _databaseService: TypeOrmDatabaseService) {
        console.log('register departments');
        loc.register('departments', new DepartmentsService(_databaseService));

        console.log('register employees');
        const employeesService = new EmployeesService(_databaseService);
        loc.register('employees', employeesService);
        console.log('register done');
    }

    public getService(entity: string): IService {
        return loc.resolve(entity);
    }
}
