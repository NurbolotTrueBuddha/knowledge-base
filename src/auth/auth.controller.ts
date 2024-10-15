import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpAuthGuard } from './auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const token = await this.authService.getUser(body);
    return token;
  }

  @UseGuards(HttpAuthGuard)
  @Post('test')
  async test(@Req() req: { user: { id: string } }) {
    return req.user;
  }
}
