import { Module, NestModule, RequestMethod, MiddlewaresConsumer, OnModuleInit } from '@nestjs/common';
import { DataController } from './data.controller';
import { ServiceRegistry } from './service.registry';
import { DataFindMiddleware } from './data.find.middleware';

import { DatabaseModule } from '../database/database.module';
import { TypeOrmDatabaseConfig } from '../database/typeOrm.database.config';
import { DatabaseConfig } from './database.config';

import { EmployeeService } from '../employees/employee.service';
import { DepartmentService } from '../employees/department.service';

@Module({
    modules: [DatabaseModule],
    controllers: [DataController],
    components: [
        ServiceRegistry,
        DepartmentService,
        EmployeeService,
        { provide: TypeOrmDatabaseConfig, useClass: DatabaseConfig },
    ],
})
export class DataModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(DataFindMiddleware).forRoutes({
            path: 'api/:entity/:id', method: RequestMethod.ALL
        });
    }
}