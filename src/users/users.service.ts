import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  
  async findOne(username: string): Promise<User | undefined> {
      return this.userRepository.findOne( { name: username })
  }

  async create(name: string, password: string) {
    const saltOrRounds = 10;
    let hashedPass = await bcrypt.hash(password, saltOrRounds);
    let newUser = new User(name, hashedPass)
    return this.userRepository.save(newUser);
  }

  comparePassword(password: string, hashedPassword: string): Promise<boolean>  {
    return bcrypt.compare(password, hashedPassword)
  }

}