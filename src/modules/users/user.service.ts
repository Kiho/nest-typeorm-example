import { Component } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeOrm.database.service';
import { User } from './user.entity';

import { ServiceBase } from '../data/service.base';

@Component()
export class UsersService extends ServiceBase<User> {

    constructor(databaseService: TypeOrmDatabaseService) {
        super(databaseService, User);
    }

    protected getSeedData(): User[] {
        return [new User('Kiho'), new User('Kevin')];
    }
}
