import { Injectable } from '@nestjs/common';
import { User } from '../users/interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { ExternalUserDTO } from './dto/external-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  addUser(_user_: CreateUserDTO): ExternalUserDTO {
    const user: User = {
      ..._user_,
      id: uuidv4(),
      dateOfBirth: new Date(),
    };
    this.users.push(user);
    return {
      ...user,
      dateOfBirth: user.dateOfBirth,
    };
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((i) => i.id !== id);
  }

  updateUser(id: string, dto: UpdateUserDTO): User {
    const user = this.getUserById(id);
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = {
      ...user,
      ...dto,
      dateOfBirth: new Date(user.dateOfBirth),
    };
    return this.users[index];
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers(): Array<User> {
    return this.users;
  }

  getUserByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }
}
