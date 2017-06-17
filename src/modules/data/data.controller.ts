import { Response } from 'express';
import { Controller, Get, Post, HttpStatus, Req, Res, Param, Body, Put, Delete } from '@nestjs/common';
import { IService } from '../database/service.interface';

import { Registry } from './registry';

@Controller()
export class DataController {

    constructor(private _registry: Registry) {

    }

    getService(entity: string): IService {
        return this._registry.getService(entity);
    }

    // C
    @Post('api/:entity/')
    public async addData(@Res() res: Response, @Body('data') data, @Param('entity') entity) {        
        const addedData = await this.getService(entity).add(data);
        res.status(HttpStatus.CREATED).json(addedData)
    }

    // R
    @Get('api/:entity')
    public async getAllData(@Req() req, @Res() res: Response, @Param('entity') entity) {
        const data = await this.getService(entity).getAll();
        res.status(HttpStatus.OK).json(data);
    }

    @Get('api/:entity/:id')
    public async getData(@Req() req, @Res() res: Response, @Param('entity') entity, @Param('id') id) {
        // DataFindMiddleware attaches the found data to the request or returns a 404
        const existingData = req.data;

        res.status(HttpStatus.OK).json(existingData);
    }

    // U
    @Put('api/:entity/:id')
    public async replaceData(@Req() req, @Res() res: Response, @Body('data') data, @Param('entity') entity, @Param('id') id) {
        // console.log('replaceData', entity, data);
        // DataFindMiddleware attaches the found data to the request or returns a 404
        const existingData = req.data;
        // in this case, we don't need to interact with it.

        const replacedData = await this.getService(entity).update(data);
        res.status(HttpStatus.OK).json(replacedData)
    }

    // D
    @Delete('api/:entity/:id')
    public async deleteData(@Req() req, @Res() res: Response, @Param('entity') entity, @Param('id') id) {
        // DataFindMiddleware attaches the found data to the request or returns a 404
        const existingData = req.data;

        const deletedData = await this.getService(entity).remove(existingData);
        res.status(HttpStatus.OK).json(deletedData);
    }
}