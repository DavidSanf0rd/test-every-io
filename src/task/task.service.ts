import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable({ scope: Scope.REQUEST })
export class TaskService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>,
              @Inject(REQUEST) private request) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {

    let task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.current_status = createTaskDto.current_status;
    task.user = this.request.user;

    return await this.taskRepository.save(task)
  }

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: number) {
    return this.taskRepository.findOne({id: id}) 
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto)
  }

  remove(id: number) {
    return this.taskRepository.delete(id)
  }
}
