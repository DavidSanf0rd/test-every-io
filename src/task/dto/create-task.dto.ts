import { PartialType } from "@nestjs/mapped-types"
import { TaskStatus } from "../entities/task-status.entity"
import { Task } from "../entities/task.entity"

export class CreateTaskDto {

    title: string

    description: string

    statusId: number
}