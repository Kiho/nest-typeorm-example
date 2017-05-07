import {Module, NestModule} from 'nest.js';
import {TypeOrmDatabaseService} from "./typeOrm.database.service";

@Module({
    components: [TypeOrmDatabaseService],
    exports: [TypeOrmDatabaseService]
})
export class DatabaseModule implements NestModule {
    constructor(private typeOrmDatabaseService: TypeOrmDatabaseService) {}
}