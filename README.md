# Nest TypeORM example

Example usage of [TypeORM](https://github.com/typeorm/typeorm) with the [Nest](https://github.com/kamilmysliwiec/nest) framework.

### Updates
- Unlike original project, there is only one controller to handle all incomming API calls.

### Overview

- TypeORM is implemented by the `database` Nest module, the same as any other piece of user code should be in a Nest application.
- The `database` module defines the injectable service `TypeOrmDatabaseService` which can be used to access the TypeORM repositories or EntityManager. 
- Additional ORM's such as Mongoose could be implemented in this module easily by simply defining additional services which manage configuration and connection. 
- The interface `Service<T>` is provided for loose coupling between controllers and services, so you'll see use of it in the examples.
- TypeORM is configured to find and manage all entities under `src/modules`, so just name your entities `anything.entity.ts` and TypeORM will pick them up. 
- TypeORM's autosync is on by default so the db schema will be updated automatically by TypeORM.

### Examples
Service:
```typescript
@Component()
export class EmployeesService implements Service<Employee> {
    constructor(private databaseService: TypeOrmDatabaseService) {}
    
    private get repository(): Promise<Repository<Employee>> {
        return this.databaseService.getRepository(Employee);
    }
        
    public async getAll(): Promise<Employee[]> {
        return (await this.repository).find();
    }
    
    ...
}
```

Controller:
```typescript
@Controller()
export class EmployeesController {
    private employeesService: Service<Employee>;

    constructor(employeesService: EmployeesService) {
        this.employeesService = employeesService;
    }
    
    @Get('employees')
    public async getAllEmployees(@Request() req, @Response() res: express.Response) {
        const employees = await this.employeesService.getAll();
        res.status(HttpStatus.OK).json(employees);
    }
    
    ...
}
```

### Installation

```
$ npm i
```

### Configuration

The server app and TypeORM implementation must be configured via env variables. 

Here's an example configuration which assumes a MySQL server is running locally:

```
PORT=3000
DB_DRIVER=mysql
DB_USERNAME=test
DB_PASSWORD=test
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=nest
```

### Start

```
$ npm start
```
