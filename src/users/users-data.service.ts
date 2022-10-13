import { Injectable } from '@nestjs/common';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/user-address.respository';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { User } from './db/users.entity';
import { UserAddress } from './db/users-addresses.entity';
import { CreateUserAddressDTO, CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserAddressDTO, UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
  ) {}
  private users: Array<User> = [];

  async addUser(_user_: CreateUserDTO): Promise<User> {
    const checkEmail = await this.userRepository.getUserByEmail(_user_.email);
    if (checkEmail.length) {
      throw new UserRequireUniqueEmailException();
    }
    const userToSave = new User();
    userToSave.firstName = _user_.firstName;
    userToSave.lastName = _user_.lastName;
    userToSave.email = _user_.email;
    userToSave.dateOfBirth = _user_.dateOfBirth;
    userToSave.address = await this.prepareUserAddressesToSave(_user_.address);
    userToSave.role = _user_.role;
    return this.userRepository.save(userToSave);
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
      addressToSave.apartment = add.apartment;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return addresses;
  }
}
