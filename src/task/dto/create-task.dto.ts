import { PartialType } from "@nestjs/mapped-types"
import { Task } from "../entities/task.entity"

export class CreateTaskDto {

    title: string

    description: string

    current_status: string

    toDomain(): Task {
        

        return task;
    }
}