import { User } from "../users/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./entities/task-status.entity";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @ManyToOne(() => TaskStatus, {
        eager: true
    })
    status: TaskStatus

    @ManyToOne(() => User)
    user: User
}