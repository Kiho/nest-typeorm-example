import { Component } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeOrm.database.service';
import { Department } from './department.entity';

import { ServiceBase } from '../data/service.base';

@Component()
export class DepartmentsService extends ServiceBase<Department> {

    constructor(databaseService: TypeOrmDatabaseService) {
        super(databaseService, Department);
    }

    protected getSeedData(): Department[] {
        return [new Department('Marketing', 'Marketing 1'), new Department('Sales', 'Sales')];
    }
}
