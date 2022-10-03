import { Controller } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { Body, Get, Param, Post, Put, Delete, HttpCode } from '@nestjs/common';
import { ExternalUserDTO } from './dto/external-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  @Get(':id')
  getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.getUserById(_id_));
  }

  @Get() getAllUsers(): Array<ExternalUserDTO> {
    return this.userRepository.getAllUsers().map(this.mapUserToExternal);
  }

  @Post()
  addUser(@Body() _user_: CreateUserDTO): ExternalUserDTO {
    return this.userRepository.addUser(_user_);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDTO,
  ): ExternalUserDTO {
    return this.mapUserToExternal(this.userRepository.updateUser(id, dto));
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') _id_: string): void {
    return this.userRepository.deleteUser(_id_);
  }

  mapUserToExternal(user: User): ExternalUserDTO {
    return {
      ...user,
      dateOfBirth: dateToArray(user.dateOfBirth),
    };
  }
}
