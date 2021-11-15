import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatusService } from 'src/task/task-status.service';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Seeder } from './seeder.entity';

@Injectable()
export class SeederService {
    constructor(private readonly userService: UsersService, 
                private readonly taskStatusService: TaskStatusService,
                @InjectRepository(Seeder) private readonly seederRepository: Repository<Seeder>) {}

    async seed() {
        let hasAlreadyExecuted = await this.hasAlreadyExecuted();
        if (hasAlreadyExecuted) {
            Logger.log('seeder already executed. Skipping!')
            return;
        }

        await this.seedUsers()
        await this.seedTaskStatuses()
        await this.markAsAlreadyExecuted()
    }

    async seedTaskStatuses() {
        Logger.log('Seeding task statuses')
        await this.taskStatusService.create('To do', true)
        await this.taskStatusService.create('In Progress')
        await this.taskStatusService.create('Done')
        await this.taskStatusService.create('Archived')
    }

    async seedUsers() {
        Logger.log('Seeding users')
        await this.userService.create('Sanford', 'sanford')
        await this.userService.create('Sergey', 'Sergey')
        await this.userService.create('Barry', 'barry')
    }

    async hasAlreadyExecuted(): Promise<boolean> {
        let result = await this.seederRepository.count({ hasAlreadyExecuted: true }) > 0
        Logger.debug(`already executed result: ${result}`);
        return Promise.resolve(result);
    }

    markAsAlreadyExecuted(): Promise<Seeder> {
        Logger.log('Marking seeder as already executed')
        let alreadyExecutedSeeder = new Seeder();
        alreadyExecutedSeeder.hasAlreadyExecuted = true
        return this.seederRepository.save(alreadyExecutedSeeder);
    }
}