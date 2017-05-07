import {Module} from 'nest.js';
import {EmployeesModule} from "../employees/employees.module";
import {HealthCheckModule} from "../healthcheck/healthcheck.module";

@Module({
    modules: [EmployeesModule, HealthCheckModule],
})
export class ApplicationModule {}