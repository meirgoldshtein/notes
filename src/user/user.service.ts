import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './entities/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel:Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = new this.userModel({
        ...createUserDto,
        password: hashedPassword
      })      
      return await user.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findOne(username: string) {
    try {
      const user = this.userModel.findOne({ username });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


}
