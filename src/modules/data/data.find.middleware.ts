import { Middleware, NestMiddleware, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { IService } from '../database/service.interface';
import { Registry } from './registry';

@Middleware()
export class DataFindMiddleware implements NestMiddleware {

    constructor(private _registry: Registry) {

    }

    getService(entity: string): IService {
        return this._registry.getService(entity);
    }

    resolve() {
        return async (req, res, next) => {
            // console.log("req.params.entity", req.params.entity);
            // if this middleware is misapplied to a route without ID, params.id would be null
            if (!req.params.id || !req.params.entity) {
                throw new HttpException(
                    { error: 'Oops, something went wrong.' }, 
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            } 

            const service = this.getService(req.params.entity);
            const obj = await service.get(req.params.id);
            if (!obj) {
                throw new HttpException(req.params.entity +' not found.', 404);
            }
            // console.log("resolve obj", obj);
            req.data = obj;
            next();
        }
    }
}