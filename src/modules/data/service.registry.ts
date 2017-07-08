import { Component, OnModuleInit } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeOrm.database.service';
import { IService } from '../database/service.interface';
import { ServiceLocator } from './service.locator';

import { EmployeeService } from '../employees/employee.service';
import { DepartmentService } from '../employees/department.service';
import { UserService } from '../users/user.service';
import { EntityType } from './entity.interface';

const loc = new ServiceLocator();

@Component()
export class ServiceRegistry implements OnModuleInit {
    constructor(private databaseService: TypeOrmDatabaseService) {
        
    }

    onModuleInit() {
        this.register(this.databaseService);
    }

    private async register(databaseService: TypeOrmDatabaseService) {
        await databaseService.createConnection();

        const services = [
            new DepartmentService(databaseService),
            new EmployeeService(databaseService),
            new UserService(databaseService),
        ];
        
        services.forEach(x => {
            loc.register(x.name, x);
            x.seed();
        });
        console.log('done: register', services.map(x => x.name));
    }

    public getService(entity: EntityType): IService {
        return loc.resolve(entity);
    }
}
