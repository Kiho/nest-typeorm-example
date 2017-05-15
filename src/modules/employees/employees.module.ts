import { Module, NestModule, RequestMethod, MiddlewaresConsumer, OnModuleInit } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { DatabaseModule } from '../database/database.module';
import { EmployeeFindMiddleware } from './employee.find.middleware';
import { TypeOrmDatabaseConfig } from '../database/typeOrm.database.config';
import { EmployeeDatabaseConfig } from './employee.database.config';

@Module({
    modules: [DatabaseModule],
    controllers: [EmployeesController],
    components: [
        EmployeesService,
        { provide: TypeOrmDatabaseConfig, useClass: EmployeeDatabaseConfig },
    ],
})
export class EmployeesModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(EmployeeFindMiddleware).forRoutes({
            path: 'employees/:id', method: RequestMethod.ALL
        });
    }
}