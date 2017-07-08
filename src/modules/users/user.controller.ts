import { Response } from 'express';
import { Controller, Get, Post, HttpStatus, Req, Res, Param, Body, Put, Delete,
    UseFilters, UsePipes   } from '@nestjs/common';
import { IService } from '../database/service.interface';
import { UserService } from './user.service';
import { CustomExceptionFilter } from '../common/exception.filter';
import { ValidatorPipe } from '../common/validator.pipe';
import { User } from './user.entity';
import { ServiceRegistry } from '../data/service.registry';

@Controller('api/user')
@UseFilters(new CustomExceptionFilter())
export class UserController {
    constructor(private _registry: ServiceRegistry) {

    }

    get Service(): UserService {
        return this._registry.getService('user') as UserService;
    }

    @Get()
    public async getAllUsers(@Res() res: Response) {
        const users = await this.Service.getAll();
        res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    public async getUser(@Res() res: Response, @Param('id') id: string) {
        const user = await this.Service.get(parseInt(id));
        res.status(HttpStatus.OK).json(user);
    }

    @Post()
    @UsePipes(new ValidatorPipe())
    public async addUser(@Res() res: Response, @Body('user') user: string) {
        const msg = await this.Service.add(new User(user));
        res.status(HttpStatus.CREATED).json(msg);
    }
}