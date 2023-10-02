/** @nest */
import { Injectable } from '@nestjs/common';

/** @dtos */
import { SignUpDto } from '../auth/dtos/sign-up.dto';

/** @repositories */
import { DataSource, Like, Repository } from 'typeorm';
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

  /** @Repository @findOne */
  async findOneById(id: number) {
    return await this.findOne({ where: { id } });
  }

  /** @Repository @findOne */
  async findOneByEmail(email: string) {
    return this.findOne({ where: { email } });
  }

  /** @Repository @findOne */
  async findOneByUsername(username: string) {
    return this.findOne({ where: { username } });
  }

  /** @Repository @Forward @findOne */
  async findOneByIdentifier(identifier: string) {
    return (
      (await this.findOneByEmail(identifier)) ||
      (await this.findOneByUsername(identifier)) ||
      (await this.findOneById(parseInt(identifier)))
    );
  }

  /** @Repository @Forward @find */
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

  /** @Repository @find */
  async findByFirstName(firstName: string) {
    return this.find({ where: { firstName } });
  }

  /** @Repository @find */
  async findByLastName(lastName: string) {
    return this.find({ where: { lastName } });
  }

  //==========// //==========// /* update */ //==========////==========//

  /** @Repository @update @identifier */
  async updateEmail(id: number, email: string) {
    return this.update({ id }, { email });
  }

  /** @Repository @update @identifier */
  async updateUsername(id: number, username: string) {
    return this.update({ id }, { username });
  }

  /** @Repository @update @auth */
  async updatePassword(id: number, password: string) {
    return this.update({ id }, { password });
  }

  /** @Repository @update @auth */
  async updateAuthLevel(id: number, authLevel: string) {
    return this.update({ id }, { authLevel });
  }

  /** @Repository @update */
  async updateFirstName(id: number, firstName: string) {
    return this.update({ id }, { firstName });
  }

  /** @Repository @update */
  async updateLastName(id: number, lastName: string) {
    return this.update({ id }, { lastName });
  }

  /** @Repository @update */
  async updateDateOfBirth(id: number, dateOfBirth: string) {
    return this.update({ id }, { dateOfBirth });
  }

  /** @Repository @update */
  async updatePhoneNumber(id: number, phoneNumber: string) {
    return this.update({ id }, { phoneNumber });
  }

  /** @Repository @update */
  async updateAddress(id: number, address: string) {
    return this.update({ id }, { address });
  }

  /** @Repository @update */
  async updateCity(id: number, city: string) {
    return this.update({ id }, { city });
  }

  /** @Repository @update */
  async updateState(id: number, state: string) {
    return this.update({ id }, { state });
  }

  /** @Repository @update */
  async updateCountry(id: number, country: string) {
    return this.update({ id }, { country });
  }

  /** @Repository @update */
  async updateProfilePicture(id: number, profilePicture: string) {
    return this.update({ id }, { profilePicture });
  }
}
