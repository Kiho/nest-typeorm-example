import { Component } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeOrm.database.service';
import { IService } from '../database/service.interface';
import { ServiceLocator } from './service.locator';

import { EmployeeService } from '../employees/employee.service';
import { DepartmentService } from '../employees/department.service';
import { UserService } from '../users/user.service';
import { EntityType } from './entity.interface';

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
        loc.register('department', new DepartmentService(databaseService));

        console.log('register employees');
        loc.register('employee', new EmployeeService(databaseService));
        
        console.log('register users');
        loc.register('user', new UserService(databaseService));

        console.log('register done');
    }

    public getService(entity: EntityType): IService {
        return loc.resolve(entity);
    }
}
