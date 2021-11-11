import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { SeederService } from './seeder.service';

@Module({
    imports: [DatabaseModule, UsersModule],
  providers: [SeederService, Logger]
})
export class SeederModule {}