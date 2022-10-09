import { In, Repository } from 'typeorm';
import { Role } from './role.entity';
import { Injectable } from '@nestjs/common';

Injectable();
export class RoleRepository extends Repository<Role> {
  findRolesByName(names: string[]): Promise<Role[]> {
    return this.find({
      where: {
        name: In(names),
      },
    });
  }
}
