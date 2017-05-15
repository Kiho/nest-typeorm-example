import { Response } from 'express';
import { Controller, Get, Post, HttpStatus, Req, Res, Param, Body, Put, Delete } from '@nestjs/common';
import { Service } from '../database/service.interface';
import { Employee } from './employee.entity';
import { EmployeesService } from './employees.service';

@Controller()
export class EmployeesController {

    /**
     * Only interact with the Employee service via the Service<Interface> to ensure loose coupling
     */
    private employeesService: Service<Employee>;

    constructor(employeesService: EmployeesService) {
        this.employeesService = employeesService;
    }

    // C
    @Post('employees')
    public async addEmployee(@Res() res: Response, @Body('employee') employee) {
        const addedEmployee = await this.employeesService.add(employee);
        res.status(HttpStatus.CREATED).json(addedEmployee)
    }

    // R
    @Get('employees')
    public async getAllEmployees(@Req() req, @Res() res: Response) {
        const employees = await this.employeesService.getAll();
        res.status(HttpStatus.OK).json(employees);
    }

    @Get('employees/:id')
    public async getEmployee(@Req() req, @Res() res: Response, @Param('id') id) {
        // EmployeeFindMiddleware attaches the found employee to the request or returns a 404
        const existingEmployee = req.employee;

        res.status(HttpStatus.OK).json(existingEmployee);
    }

    // U
    @Put('employees/:id')
    public async replaceEmployee(@Req() req, @Res() res: Response, @Body('employee') employee, @Param('id') id) {
        // EmployeeFindMiddleware attaches the found employee to the request or returns a 404
        const existingEmployee = req.employee;
        // in this case, we don't need to interact with it.

        const replacedEmployee = await this.employeesService.update(employee);
        res.status(HttpStatus.OK).json(replacedEmployee)
    }

    // D
    @Delete('employees/:id')
    public async deleteEmployee(@Req() req, @Res() res: Response, @Param('id') id) {
        // EmployeeFindMiddleware attaches the found employee to the request or returns a 404
        const existingEmployee = req.employee;

        const deletedEmployee = await this.employeesService.remove(existingEmployee);
        res.status(HttpStatus.OK).json(deletedEmployee);
    }
}