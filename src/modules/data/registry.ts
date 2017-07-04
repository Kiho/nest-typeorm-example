import { Component } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeOrm.database.service';
import { IService } from '../database/service.interface';
import { ServiceLocator } from './service.locator';

import { EmployeesService } from '../employees/employees.service';
import { DepartmentsService } from '../employees/departments.service';
import { UsersService } from '../users/user.service';

const loc = new ServiceLocator();

@Component()
export class Registry {
    constructor(private databaseService: TypeOrmDatabaseService) {
        console.log('register constructor');
        this.register(databaseService);
    }

    private async register(databaseService: TypeOrmDatabaseService) {
        await databaseService.createConnection();

        console.log('register departments');
        loc.register('department', new DepartmentsService(databaseService));

        console.log('register employees');
        loc.register('employee', new EmployeesService(databaseService));
        
        console.log('register users');
        loc.register('user', new UsersService(databaseService));

        console.log('register done');
    }

    public getService(entity: string): IService {
        return loc.resolve(entity);
    }
}
