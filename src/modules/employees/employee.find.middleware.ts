import { Middleware, NestMiddleware, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { EmployeesService } from './employees.service';
import { Service } from '../database/service.interface';
import { Employee } from './employee.entity';

@Middleware()
export class EmployeeFindMiddleware implements NestMiddleware {

    /**
     * Only interact with the Employee service via the Service<Interface> to ensure loose coupling
     */
    private employeesService: Service<Employee>;

    constructor(employeesService: EmployeesService) {
        this.employeesService = employeesService;
    }

    resolve() {
        return async (req, res, next) => {
            // if this middleware is misapplied to a route without ID, params.id would be null
            if (!req.params.id) {
                throw new HttpException(
                    { error: 'Oops, something went wrong.' }, 
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }     

            const employee = await this.employeesService.get(req.params.id);
            if (!employee) {
                throw new HttpException('Employee not found.', 404);
            }
            req.employee = employee;
            next();
        }
    }
}