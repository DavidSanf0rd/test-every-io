import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskStatus } from './entities/task-status.entity';
import { TaskStatusService } from './task-status.service';

@Module({
    imports: [TypeOrmModule.forFeature([Task, TaskStatus])],
    controllers: [TaskController],
    providers: [TaskService, TaskStatusService],
    exports: [TaskService, TaskStatusService]
})
export class TaskModule {}