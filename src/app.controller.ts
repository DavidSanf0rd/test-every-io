import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuardGuard } from './guard/local-auth-guard.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, 
              private readonly authService: AuthService) {}

}
