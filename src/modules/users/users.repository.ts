/** @nest */
import { Injectable } from '@nestjs/common';

/** @dtos */
import { SignUpDto } from '../auth/dtos/sign-up.dto';

/** @repositories */
import { DataSource, Like, Repository } from 'typeorm';

/** @entities */
import { User } from './user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /** @Repository @save */
  async createUser(user: SignUpDto) {
    return await this.save(Object.assign(new User(), { ...user }));
  }

  //==========// //==========// /* find */ //==========////==========//

  async findOneById(id: number) {
    return await this.findOne({ where: { id } });
  }

  findOneByIdWithFirends(id: number) {
    return this.findOne({ where: { id }, relations: ['friends'] });
  }

  async findOneByEmail(email: string) {
    return this.findOne({ where: { email } });
  }

  async findOneByUsername(username: string) {
    return this.findOne({ where: { username } });
  }

  async findOneByIdentifier(identifier: string) {
    return (
      (await this.findOneByEmail(identifier)) ||
      (await this.findOneByUsername(identifier)) ||
      (await this.findOneById(parseInt(identifier)))
    );
  }

  async findByIdentifier(identifier: string) {
    return this.find({
      where: [
        { firstName: Like(`%${identifier}%`) },
        { lastName: Like(`%${identifier}%`) },
        { username: Like(`%${identifier}%`) },
        { email: Like(`%${identifier}%`) },
      ],
    });
  }

  async findByFirstName(firstName: string) {
    return this.find({ where: { firstName } });
  }

  async findByLastName(lastName: string) {
    return this.find({ where: { lastName } });
  }

  //==========// //==========// /* update */ //==========////==========//

  async addFriend(user: User, friend: User) {
    user.friends.push(friend);
    friend.friends.push(user);
    return this.save([user, friend]);
  }

  async updateEmail(id: number, email: string) {
    return this.update({ id }, { email });
  }

  async updateUsername(id: number, username: string) {
    return this.update({ id }, { username });
  }

  async updatePassword(id: number, password: string) {
    return this.update({ id }, { password });
  }

  async updateAuthLevel(id: number, authLevel: string) {
    return this.update({ id }, { authLevel });
  }

  async updateFirstName(id: number, firstName: string) {
    return this.update({ id }, { firstName });
  }

  async updateLastName(id: number, lastName: string) {
    return this.update({ id }, { lastName });
  }

  async updateDateOfBirth(id: number, dateOfBirth: string) {
    return this.update({ id }, { dateOfBirth });
  }

  async updatePhoneNumber(id: number, phoneNumber: string) {
    return this.update({ id }, { phoneNumber });
  }

  async updateAddress(id: number, address: string) {
    return this.update({ id }, { address });
  }

  async updateCity(id: number, city: string) {
    return this.update({ id }, { city });
  }

  async updateState(id: number, state: string) {
    return this.update({ id }, { state });
  }

  async updateCountry(id: number, country: string) {
    return this.update({ id }, { country });
  }

  async updateProfilePicture(id: number, profilePicture: string) {
    return this.update({ id }, { profilePicture });
  }
}
