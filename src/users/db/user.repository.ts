import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';

Injectable();
export class UserRepository extends Repository<User> {
  getUserByEmail(email: string): Promise<User[]> {
    return this.find({
      where: {
        email: email,
      },
    });
  }
}
