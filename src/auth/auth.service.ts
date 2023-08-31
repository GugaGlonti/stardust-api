/** @nest */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/** @repositories */
import { UsersRepository } from '../users/users.repository';

/** @dtos */
import { SignUpDto } from '../users/dtos/sign-up.dto';
import { SignInDto } from '../users/dtos/sign-in.dto';

/** @errors */
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

  /** @throws TOKEN EXPIRED | USER NOT FOUND | TOKEN INVALID */
  async me(token: string) {
    const jwt = await this.extractJWT(token);

    if (jwt.exp > Date.now()) {
      throw new Error(ErrorsEnum.TOKEN_EXPIRED);
    }

    const user = await this.usersRepository.findOneById(jwt.id);

    if (!user) {
      throw new Error(ErrorsEnum.USER_NOT_FOUND);
    }

    return user;
  }

  /** @throws TOKEN INVALID */
  private async extractJWT(token: string) {
    interface JWT {
      id: number;
      iat: number;
      exp: number;
    }

    try {
      return this.jwtService.verify(token) as JWT;
    } catch (error) {
      throw new Error(ErrorsEnum.TOKEN_INVALID);
    }
  }
}
