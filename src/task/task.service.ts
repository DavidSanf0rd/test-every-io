import { HttpException, Inject, Injectable, Logger, Scope, UnprocessableEntityException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './entities/task-status.entity';
import { Task } from './task.entity';
import { TaskStatusService } from './task-status.service';

@Injectable({ scope: Scope.REQUEST })
export class TaskService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>,
              @InjectRepository(TaskStatus) private readonly taskStatusRepository: Repository<TaskStatus>,
              @Inject(REQUEST) private request,
              private readonly taskStatusService: TaskStatusService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {

    let defaultTaskStatus = await this.taskStatusService.findDefault();

    let task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = defaultTaskStatus;
    task.user = this.request.user;

    Logger.debug(`saving task: ${task}`)
    return await this.taskRepository.save(task)
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({ user: this.request.user});
  }

  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({id: id, user: this.request.user}) 
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    let taskToUpdate = new Task()
    if (updateTaskDto.description) {
        Logger.log(`updating task ${id} description to: ${updateTaskDto.description}`)
        taskToUpdate.description = updateTaskDto.description;
    }
    if (updateTaskDto.title) {
        Logger.log(`updating task ${id} title to: ${updateTaskDto.title}`)
        taskToUpdate.title = updateTaskDto.title
    }

    if (updateTaskDto.statusId) {
        const status = await this.taskStatusService.findById(updateTaskDto.statusId);

        if (!status) {
            Logger.log(`statusId doesn't exists: ${updateTaskDto.statusId}`)
            throw new UnprocessableEntityException();
        }

        taskToUpdate.status = status
    }

    return this.taskRepository.update({id: id, user: this.request.user}, taskToUpdate)
  }

  remove(id: number) {
    return this.taskRepository.delete({id: id, user: this.request.user} )
  }


}
