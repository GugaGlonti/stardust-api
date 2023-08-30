import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { ErrorsEnum } from '../common/enums/errors.enum';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  /** @Get @Throws USER NOT FOUND */
  async findOneById(id: number) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    return user;
  }

  /** @Get @Throws USER NOT FOUND */
  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    return user;
  }

  /** @Get @Throws USER NOT FOUND */
  async findOneByUsername(username: string) {
    const user = await this.usersRepository.findOneByUsername(username);
    if (!user) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    return user;
  }

  /** @Get @Throws USER NOT FOUND */
  async findOneByIdentifier(identifier: string) {
    const user = await this.usersRepository.findOneByIdentifier(identifier);
    if (!user) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    return user;
  }

  /** @Get @Throws USER NOT FOUND */
  async findByFirstName(firstName: string) {
    const users = await this.usersRepository.findByFirstName(firstName);
    if (!users.length) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    return users;
  }

  /** @Get @Throws USER NOT FOUND */
  async findByLastName(lastName: string) {
    const users = await this.usersRepository.findByLastName(lastName);
    if (!users.length) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    return users;
  }
}
