import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Employee {
    constructor(name: string, age: number, title:string, departmentId: number, rate: number) {
        this.name = name;
        this.age = age;
        this.title = title;
        this.departmentId = departmentId;
        this.rate = rate;
    }

    @PrimaryColumn('int', { generated: true })
    id: number;

    @Column()
    name: string;

    @Column('int')
    age: number;

    @Column()
    title: string;

    @Column('int')
    departmentId: number;

    @Column('decimal')
    rate: number;
}