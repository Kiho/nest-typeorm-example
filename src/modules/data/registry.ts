import { Component } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeOrm.database.service';
import { IService } from '../database/service.interface';
import { ServiceLocator } from './service.locator';

import { EmployeesService } from '../employees/employees.service';

const loc = new ServiceLocator();

@Component()
export class Registry {

    constructor(private _databaseService: TypeOrmDatabaseService) {
        loc.register('employees', new EmployeesService(this._databaseService));
    }

    public getService(entity: string): IService {
        return loc.resolve(entity);
    }
}
