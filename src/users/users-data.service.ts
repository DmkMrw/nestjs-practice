import { Injectable } from '@nestjs/common';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/user-address.respository';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { User } from './db/users.entity';
import { UserAddress } from './db/users-addresses.entity';
import { CreateUserAddressDTO, CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserAddressDTO, UpdateUserDTO } from './dto/update-user.dto';
import { Connection, EntityManager } from 'typeorm';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
    private connection: Connection,
  ) {}
  private users: Array<User> = [];

  async addUser(user: CreateUserDTO): Promise<User> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const userToSave = new User();

      userToSave.firstName = user.firstName;
      userToSave.lastName = user.lastName;
      userToSave.email = user.email;
      userToSave.role = user.role;
      userToSave.dateOfBirth = user.dateOfBirth;

      userToSave.address = await this.prepareUserAddressesToSave(user.address);

      return this.userRepository.save(userToSave);
    });
  }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<User> {
    const userToUpdate = await this.getUserById(id);

    userToUpdate.firstName = dto.firstName;
    userToUpdate.lastName = dto.lastName;
    userToUpdate.email = dto.email;
    userToUpdate.dateOfBirth = dto.dateOfBirth;
    userToUpdate.address = await this.prepareUserAddressesToSave(dto.address);
    userToUpdate.role = dto.role;

    await this.userAddressRepository.deleteUserAddressesByUserId(id);
    await this.userRepository.save(userToUpdate);

    return this.getUserById(id);
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDTO[] | UpdateUserAddressDTO[],
  ): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];
    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.house = add.house;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return addresses;
  }
}
