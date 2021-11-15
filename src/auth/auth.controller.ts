import { Controller, Request, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guard/jwt-auth.guard";
import { LocalAuthGuardGuard } from "src/guard/local-auth-guard.guard";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuardGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}