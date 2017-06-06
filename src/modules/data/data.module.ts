import { Module, NestModule, RequestMethod, MiddlewaresConsumer, OnModuleInit } from '@nestjs/common';
import { DataController } from './data.controller';
import { Registry } from './registry';
import { DataFindMiddleware } from './data.find.middleware';
import { EmployeesService } from '../employees/employees.service';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmDatabaseConfig } from '../database/typeOrm.database.config';
import { MsSqlDatabaseConfig } from './database.config.mssql';

@Module({
    modules: [DatabaseModule],
    controllers: [DataController],
    components: [
        Registry,
        { provide: TypeOrmDatabaseConfig, useClass: MsSqlDatabaseConfig },
    ],
})
export class DataModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(DataFindMiddleware).forRoutes({
            path: 'api/:entity/:id', method: RequestMethod.ALL
        });
    }
}