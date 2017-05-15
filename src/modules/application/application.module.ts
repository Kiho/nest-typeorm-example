import { Module } from '@nestjs/common';
import { EmployeesModule } from "../employees/employees.module";

@Module({
    modules: [EmployeesModule],
})
export class ApplicationModule {}