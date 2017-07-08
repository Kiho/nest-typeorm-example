import { UserService } from './user.service';
import { Middleware, NestMiddleware, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { ServiceRegistry } from '../data/service.registry';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    constructor(private _registry: ServiceRegistry) {

    }

    get Service(): UserService {
        return this._registry.getService('user') as UserService;
    }

    public resolve(): (req, res, next) => void {
        return async (req, res, next) => {
            const username = req.headers['x-access-token'];
            const users = await this.Service.getAll();
            console.log('AuthMiddleware', users);
            const user = users.find(({ name }) => name === username);
            if (!user) {
                throw new HttpException('User not found.', 401);
            }
            req.user = user;
            next();
        };
    }
}