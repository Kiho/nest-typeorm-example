import { EmployeesService } from './employees.service';
import { HttpException, Middleware, NestMiddleware } from 'nest.js';
import {Service} from "../database/service.interface";
import {Employee} from "./employee.entity";

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
        return (req, res, next) => {
            this.employeesService.get(req.params.id).then(employee => {
                // if this middleware is misapplied to a route without ID, params.id would be null
                if(!req.params.id) {
                    res.status(500).send({ error: 'Oops, something went wrong.' });
                }

                if (employee) {
                    req.employee = employee;
                    next();
                } else {
                    // this just results in an unhandled promise reject if thrown, and if next isn't called and no response
                    // is sent here, the request just hangs. seems like a default exception handling filter isn't in place?
                    //   throw new HttpException('Employee not found.', 404);

                    // so just send the 404.
                    res.status(404).send({ error: 'Employee not found.' });
                }
            });
        }
    }
}