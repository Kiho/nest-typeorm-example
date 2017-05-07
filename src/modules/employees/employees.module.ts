import {Module, NestModule, RequestMethod} from 'nest.js';
import {EmployeesController} from "./employees.controller";
import {EmployeesService} from "./employees.service";
import {DatabaseModule} from "../database/database.module";
import {MiddlewaresConsumer} from "nest.js/common/interfaces/middlewares-consumer.interface";
import {EmployeeFindMiddleware} from "./employee.find.middleware";

@Module({
    components: [EmployeesService],
    controllers: [EmployeesController],
    modules: [DatabaseModule]
})
export class EmployeesModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(EmployeeFindMiddleware).forRoutes({
            path: 'employees/:id', method: RequestMethod.ALL
        });
    }
}