import { Repository } from 'typeorm';
import { UserAddress } from './users-addresses.entity';
import { Injectable } from '@nestjs/common';

Injectable();
export class UserAddressRepository extends Repository<UserAddress> {
  async deleteUserAddressesByUserId(userId: string): Promise<void> {
    const usersAddresses = await this.find({
      where: {
        id: userId,
      },
    });

    this.remove(usersAddresses);
  }
}
