import {Controller, Get, Post, HttpStatus, Request, Response, Param, Body} from 'nest.js';

@Controller()
export class HealthCheckController {
    constructor() {}

    @Get('healthcheck')
    async get(@Request() req, @Response() res, next) {
        res.status(HttpStatus.OK).send('API Online');
    }
}