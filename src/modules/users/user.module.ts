import { Module, Shared } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { AuthMiddleware } from './auth.middleware';
import { NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmDatabaseConfig } from '../database/typeOrm.database.config';
import { DatabaseConfig } from '../data/database.config';
import { Registry } from '../data/registry';

@Module({
    modules: [DatabaseModule],
    controllers: [ UsersController ],
    components: [
        Registry,
        UsersService,
        { provide: TypeOrmDatabaseConfig, useClass: DatabaseConfig },
    ],
})
export class UsersModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(UsersController);
    }
}