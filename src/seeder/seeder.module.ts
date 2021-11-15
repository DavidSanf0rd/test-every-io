import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { TaskModule } from '../task/task.module';
import { UsersModule } from '../users/users.module';
import { Seeder } from './seeder.entity';
import { SeederService } from './seeder.service';

@Module({
    imports: [DatabaseModule, TaskModule, UsersModule, AuthModule, TypeOrmModule.forFeature([Seeder])],
  providers: [SeederService, Logger]
})
export class SeederModule {}