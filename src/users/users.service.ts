import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { SignUpDto } from './dtos/sign-up.dto';
import { ErrorsEnum } from '../common/enums/errors.enum';
import { SignInDto } from './dtos/sign-in.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(user: SignUpDto) {
    if (await this.usersRepository.findOneByEmail(user.email)) {
      throw new Error(ErrorsEnum.EMAIL_ALREADY_IN_USE);
    }

    if (await this.usersRepository.findOneByUsername(user.username)) {
      throw new Error(ErrorsEnum.USERNAME_ALREADY_IN_USE);
    }

    return this.usersRepository.createUser(user);
  }

  async signIn(user: SignInDto) {
    const registeredUser = await this.usersRepository.findOneByIdentifier(
      user.identifier.toLowerCase(),
    );

    if (!registeredUser) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }

    if (!(await registeredUser.comparePassword(user.password))) {
      throw new Error(ErrorsEnum.WRONG_PASSWORD);
    }

    return { ...registeredUser, password: undefined };
  }
}
