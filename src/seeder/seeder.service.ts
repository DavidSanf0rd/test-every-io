import { Injectable } from '@nestjs/common';
import { TaskStatusService } from 'src/task/task-status.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeederService {
    constructor(private readonly userService: UsersService, 
                private readonly taskStatusService: TaskStatusService) {}

    async seed() {
        await this.seedUsers()
        await this.seedTaskStatuses()
    }

    async seedTaskStatuses() {
        await this.taskStatusService.create('To do', true)
        await this.taskStatusService.create('In Progress')
        await this.taskStatusService.create('Done')
        await this.taskStatusService.create('Archived')
    }

    async seedUsers() {
        await this.userService.create('Jhon', 'jhon')
        await this.userService.create('Sanford', 'sanford')
    }
}