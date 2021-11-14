import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskStatus {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column( { name: "is_default" } )
    isDefault: boolean
}