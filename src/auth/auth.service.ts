import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<Partial<User> | undefined> {
    const user = await this.usersService.findOne(username);

    if (!user) {
        Logger.debug(`user not found ${username}`)
        return null;
    }

    const passwordMatched = await this.usersService.comparePassword(pass, user.password)

    if (!passwordMatched) {
        Logger.debug(`Password didn't matched`)
        return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}