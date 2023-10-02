/** @nest */
import { Injectable } from '@nestjs/common';

/** @repositories */
import { UsersRepository } from './users.repository';

/** @errors */
import { ErrorsEnum } from '../common/enums/errors.enum';
import { UpdateProfileDataDto } from './dtos/update-profile-data.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  /** @Getter @throws USER NOT FOUND */
  async findOneById(id: number) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    return user;
  }

  /** @Getter @throws USER NOT FOUND */
  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    return user;
  }

  /** @Getter @throws USER NOT FOUND */
  async findOneByUsername(username: string) {
    const user = await this.usersRepository.findOneByUsername(username);
    if (!user) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    return user;
  }

  /** @Getter @throws USER NOT FOUND */
  async findOneByIdentifier(identifier: string) {
    const user = await this.usersRepository.findOneByIdentifier(identifier);
    if (!user) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    return user;
  }

  /** @Getter @throws USER NOT FOUND */
  async findByFirstName(firstName: string) {
    const users = await this.usersRepository.findByFirstName(firstName);
    if (!users.length) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    return users;
  }

  /** @Getter @throws USER NOT FOUND */
  async findByLastName(lastName: string) {
    const users = await this.usersRepository.findByLastName(lastName);
    if (!users.length) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    return users;
  }

  /** @Getter */
  async searchUsersForSearchBar(query: string) {
    const users = await this.searchUsers(query);
    users.forEach((user) => {
      delete user.id;
      delete user.password;
      delete user.authLevel;
      delete user.balance;
      delete user.dateOfBirth;
      delete user.phoneNumber;
      delete user.address;
      delete user.city;
      delete user.state;
      delete user.country;
      delete user.profilePicture;
    });
    return users;
  }

  /** @Getter */
  async searchUsers(query: string) {
    return this.usersRepository.findByIdentifier(query);
  }

  /** @throws USER NOT FOUND */
  async updateProfile(updateProfileData: UpdateProfileDataDto, user: User) {
    if (!user) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }
    const { id } = user;
    const { email, dateOfBirth, phoneNumber, address, city, state, country } =
      updateProfileData;

    try {
      await this.usersRepository.updateEmail(id, email);
      await this.usersRepository.updateDateOfBirth(id, dateOfBirth);
      await this.usersRepository.updatePhoneNumber(id, phoneNumber);
      await this.usersRepository.updateAddress(id, address);
      await this.usersRepository.updateCity(id, city);
      await this.usersRepository.updateState(id, state);
      await this.usersRepository.updateCountry(id, country);
    } catch (error) {
      throw new Error(ErrorsEnum.UNKNOWN_ERROR);
    }

    delete user.password;
    return user;
  }
}
