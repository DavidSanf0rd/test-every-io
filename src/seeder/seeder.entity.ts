import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Seeder {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'has_already_executed'})
    hasAlreadyExecuted: boolean
}