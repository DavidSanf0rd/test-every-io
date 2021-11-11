import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeederService {
    constructor(private readonly userService: UsersService) {}

    async seed() {
        await this.seedUsers()
    }

    async seedUsers() {
        await this.userService.create('Jhon', 'test_pass')
        await this.userService.create('Sanford', 'sanford')
    }
}