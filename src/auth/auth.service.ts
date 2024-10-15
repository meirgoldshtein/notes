import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Login } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/user/entities/user.interface';
import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';

import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService) { }

  async validateUser(loginDto: Login) {
    try {
      const user = await this.userService.findOne(loginDto.username);

      const isMatch = await bcrypt.compare(loginDto.password, user.password,);
      if (!isMatch) {
        throw new UnauthorizedException('Wrong password');
      }
      const payload = {
        username: user.username,
        email: user.email,
        id: user._id
      }

      return {
        access_token: this.jwtService.sign(payload),
      }
    } catch (error) {
        throw new UnauthorizedException(error.message);
    }
  }

}
