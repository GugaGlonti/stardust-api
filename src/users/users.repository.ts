/** @nest */
import { Injectable } from '@nestjs/common';

/** @dtos */
import { SignUpDto } from '../auth/dtos/sign-up.dto';

/** @repositories */
import { DataSource, Repository } from 'typeorm';
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

  /** @Repository @find */
  async findByFirstName(firstName: string) {
    return this.find({ where: { firstName } });
  }

  /** @Repository @find */
  async findByLastName(lastName: string) {
    return this.find({ where: { lastName } });
  }
}
