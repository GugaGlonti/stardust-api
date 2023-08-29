import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { SignUpDto } from './dtos/sign-up.dto';
import { ErrorsEnum } from '../common/enums/errors.enum';
import { SignInDto } from './dtos/sign-in.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(user: SignUpDto) {
    const { email, username } = user;

    if (await this.usersRepository.findOneByEmail(email)) {
      throw new Error(ErrorsEnum.EMAIL_ALREADY_IN_USE);
    }

    if (await this.usersRepository.findOneByUsername(username)) {
      throw new Error(ErrorsEnum.USERNAME_ALREADY_IN_USE);
    }

    return this.usersRepository.createUser(user);
  }

  async signIn(user: SignInDto) {
    const { identifier } = user;

    let registeredUser = await this.usersRepository.findOneByEmail(identifier);

    if (!registeredUser) {
      registeredUser = await this.usersRepository.findOneByUsername(identifier);
    }

    if (!registeredUser) throw new Error(ErrorsEnum.USER_NOT_FOUND);
    return registeredUser;
  }
}
