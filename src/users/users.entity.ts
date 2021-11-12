import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    password: string 
}