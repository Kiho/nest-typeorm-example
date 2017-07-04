import { Module, NestModule, RequestMethod, MiddlewaresConsumer, OnModuleInit } from '@nestjs/common';
import { DataController } from './data.controller';
import { Registry } from './registry';
import { DataFindMiddleware } from './data.find.middleware';

import { UserController } from '../users/user.controller';
import { AuthMiddleware } from '../users/auth.middleware';

import { DatabaseModule } from '../database/database.module';
import { TypeOrmDatabaseConfig } from '../database/typeOrm.database.config';
import { DatabaseConfig } from './database.config';

@Module({
    modules: [DatabaseModule],
    controllers: [DataController, UserController],
    components: [
        Registry,
        { provide: TypeOrmDatabaseConfig, useClass: DatabaseConfig },
    ],
})
export class DataModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(UserController);
        consumer.apply(DataFindMiddleware).forRoutes({
            path: 'api/:entity/:id', method: RequestMethod.ALL
        });
    }
}