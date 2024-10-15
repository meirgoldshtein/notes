import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      console.log(user)
      if (!user) {
        throw new BadRequestException('User not created');
      }

      return {
        'success': true,
        'user': user
      }

    } catch (error) {
      return {
        'success': false,
        error
      }
    }
  }

  @Get('profile')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

}
