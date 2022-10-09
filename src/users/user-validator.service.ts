import { Injectable } from '@nestjs/common';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';
import { UserRepository } from './db/user.repository';

@Injectable()
export class UserValidatorService {
  constructor(private userRepository: UserRepository) {}

  validateUniqueEmail(email: string): void {
    if (this.userRepository.getUserByEmail(email)) {
      throw new UserRequireUniqueEmailException();
    }
  }
}
