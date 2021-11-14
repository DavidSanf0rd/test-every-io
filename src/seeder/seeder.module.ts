import { Logger, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { TaskModule } from '../task/task.module';
import { UsersModule } from '../users/users.module';
import { SeederService } from './seeder.service';

@Module({
    imports: [DatabaseModule, TaskModule, UsersModule, AuthModule],
  providers: [SeederService, Logger]
})
export class SeederModule {}