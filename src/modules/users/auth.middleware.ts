import { UsersService } from './user.service';
import { Middleware, NestMiddleware, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) {}

    public resolve(): (req, res, next) => void {
        return async (req, res, next) => {
            const username = req.headers['x-access-token'];
            const users = await this.usersService.getAll();
            const user = users.find(({ name }) => name === username);
            if (!user) {
                throw new HttpException('User not found.', 401);
            }
            req.user = user;
            next();
        };
    }
}