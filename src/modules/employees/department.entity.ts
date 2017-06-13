import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Department {
    constructor(name: string, groupName: string) {
        this.name = name;
        this.groupName = groupName;
    }

    @PrimaryColumn('int', { generated: true })
    id: number;

    @Column()
    name: string;

    @Column()
    groupName: string;
}