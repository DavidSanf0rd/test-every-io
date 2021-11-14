import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaskStatus } from "./entities/task-status.entity";

@Injectable()
export class TaskStatusService {
    constructor(@InjectRepository(TaskStatus) private readonly taskStatusRepository: Repository<TaskStatus>) {}

    create(name: string, isDefault: boolean = false): Promise<TaskStatus> {
        let taskStatus = new TaskStatus();
        taskStatus.name = name;
        taskStatus.isDefault = isDefault;
    
        return this.taskStatusRepository.save(taskStatus)
      }
    
      findDefault(): Promise<TaskStatus> {
        return this.taskStatusRepository.findOne( { isDefault: true } );
      }

      findById(id: number): Promise<TaskStatus> {
          return this.taskStatusRepository.findOne( { id: id })
      }
}


