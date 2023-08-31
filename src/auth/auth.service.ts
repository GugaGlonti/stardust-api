import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../users/dtos/sign-up.dto';
import { SignInDto } from '../users/dtos/sign-in.dto';
import { UsersRepository } from '../users/users.repository';
import { ErrorsEnum } from '../common/enums/errors.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  /** @throws EMAIL ALREADY IN USE | USERNAME ALREADY IN USE */
  async signUp(user: SignUpDto) {
    if (await this.usersRepository.findOneByEmail(user.email)) {
      throw new Error(ErrorsEnum.EMAIL_ALREADY_IN_USE);
    }

    if (await this.usersRepository.findOneByUsername(user.username)) {
      throw new Error(ErrorsEnum.USERNAME_ALREADY_IN_USE);
    }

    return this.usersRepository.createUser(user);
  }

  /** @throws USER NOT FOUND | WRONG PASSWORD */
  async signIn({ identifier, password }: SignInDto) {
    const registeredUser =
      await this.usersRepository.findOneByIdentifier(identifier);

    if (!registeredUser) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }

    if (!(await registeredUser.comparePassword(password))) {
      throw new Error(ErrorsEnum.WRONG_PASSWORD);
    }

    const token = await this.jwtService.signAsync({ id: registeredUser.id });

    return { token };
  }

  /** @throws TOKEN EXPIRED | USER NOT FOUND */
  async me(token: string) {
    const data = this.jwtService.verify(token) as {
      id: number;
      iat: number;
      exp: number;
    };

    if (data.exp > Date.now()) {
      throw new Error(ErrorsEnum.TOKEN_EXPIRED);
    }

    const user = await this.usersRepository.findOneById(data.id);

    if (!user) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }

    return user;
  }
}