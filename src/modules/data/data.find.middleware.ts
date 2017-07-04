import { Middleware, NestMiddleware, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { IService } from '../database/service.interface';
import { Registry } from './registry';
import { EntityType } from './entity.interface';

@Middleware()
export class DataFindMiddleware implements NestMiddleware {

    constructor(private _registry: Registry) {

    }

    getService(entity: EntityType): IService {
        return this._registry.getService(entity);
    }

    resolve() {
        return async (req, res, next) => {
            const { id, entity }= req.params;
            console.log("req.params - id, entity: ", id, entity);
            // if this middleware is misapplied to a route without ID, params.id would be null
            if (!id || !entity) {
                throw new HttpException(
                    { error: 'Oops, something went wrong.' }, 
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            } 
            
            if (entity == 'user') {
                // Handle user with AuthMiddleware, so we should not see user here
                throw new HttpException('Invalid route.', 400);
            }

            const service = this.getService(entity);
            const obj = await service.get(id);
            if (!obj) {
                throw new HttpException(entity +' not found.', 404);
            }
            // console.log("resolve obj", obj);
            req.data = obj;
            next();
        }
    }
}