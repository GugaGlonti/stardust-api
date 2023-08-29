import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(user: SignUpDto) {
    return await this.save(Object.assign(new User(), { ...user }));
  }

  async findOneById(id: number) {
    return this.findOne({ where: { id } });
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
      (await this.findOneByUsername(identifier))
    );
  }
}
