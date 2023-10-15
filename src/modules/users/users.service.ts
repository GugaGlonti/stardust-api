/** @nest */
import { Injectable } from '@nestjs/common';

/** @repositories */
import { UsersRepository } from './users.repository';

/** @errors */
import { ErrorsEnum } from '../../common/enums/errors.enum';

/** @dtos */
import { UpdateProfileDataDto } from './dtos/update-profile-data.dto';

/** @entities */
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async searchUsers(query: string) {
    return this.usersRepository.findByIdentifier(query);
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOneById(id);
    if (!user) throw new Error(ErrorsEnum.USER_NOT_FOUND);
    return user;
  }

  async findOneByIdWithFirends(id: number) {
    return this.usersRepository.findOneByIdWithFirends(id);
  }

  async getFriends(username: string) {
    const { id } = await this.usersRepository.findOneByIdentifier(username);
    const { friends } = await this.usersRepository.findOneByIdWithFirends(id);
    return friends;
  }

  async areFriends(sender: User, receiver: User) {
    const { friends } = await this.findOneByIdWithFirends(sender.id);
    return friends.some((friend) => friend.id === receiver.id);
  }

  async findOneByIdentifier(identifier: string) {
    const user = await this.usersRepository.findOneByIdentifier(identifier);
    if (!user) throw new Error(ErrorsEnum.USER_NOT_FOUND);
    delete user.password;
    return user;
  }

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

  async updateProfile(updateProfileData: UpdateProfileDataDto, user: User) {
    if (!user) throw new Error(ErrorsEnum.USER_NOT_FOUND);

    const { id } = user;
    const { email, dateOfBirth, phoneNumber, address, city, state, country } =
      updateProfileData;

    await Promise.all([
      this.usersRepository.updateEmail(id, email),
      this.usersRepository.updateDateOfBirth(id, dateOfBirth),
      this.usersRepository.updatePhoneNumber(id, phoneNumber),
      this.usersRepository.updateAddress(id, address),
      this.usersRepository.updateCity(id, city),
      this.usersRepository.updateState(id, state),
      this.usersRepository.updateCountry(id, country),
    ]);

    delete user.password;
    return user;
  }

  async addFriend(user: User, friend: User) {
    await this.usersRepository.addFriend(user, friend);
  }
}
