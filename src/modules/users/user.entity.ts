import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    constructor(name: string) {
        this.name = name;
    }

    @PrimaryColumn('int', { generated: true })
    id: number;

    @Column()
    name: string;
}