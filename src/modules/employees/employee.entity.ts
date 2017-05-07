import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Employee {
    constructor(name:string, age:number) {
        this.name = name;
        this.age = age;
    }

    @PrimaryColumn("int", { generated: true })
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;
}