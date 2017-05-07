# Nest TypeORM example

Example usage of [TypeORM](https://github.com/typeorm/typeorm) with the [Nest](https://github.com/kamilmysliwiec/nest) framework.

### Overview

TypeORM is implemented by the `database` Nest module, the same as any other piece of user code should be in a Nest application.

The `database` module defines the injectable service `TypeOrmDatabaseService` which can be used to access the TypeORM repositories or EntityManager. Additional ORM's such as Mongoose could be implemented in this module easily by simply defining additional services which manage configuration and connection.

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
