import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(
    @Body() loginDto: Login,
    @Req() req: Request,
    @Res() res: Response

  ) {
    try {
      const token = await this.authService.validateUser(loginDto);
      if (!token) {
        throw new UnauthorizedException('can not create token');
      }
      res.cookie('jwt', token.access_token, { httpOnly: true, secure: true }).json( {
        success: true,
        message: 'Login successful',
      }).send();
      
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

  }

@Delete('logout')
async logout(@Res() res: Response) {
  res.clearCookie('jwt');
  return {
    success: true,
    message: 'Logout successful',
  };}

}
