/** @nest */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/** @repositories */
import { UsersRepository } from '../users/users.repository';

/** @dtos */
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';

/** @errors */
import { ErrorsEnum } from '../../common/enums/errors.enum';
import { Exception } from '../../common/classes/Exception';

/** @interfaces */
import { JWT } from '../../common/types/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  /** @throws EMAIL ALREADY IN USE | USERNAME ALREADY IN USE */
  async signUp(user: SignUpDto) {
    const { email, username } = user;

    if (await this.usersRepository.findOneByEmail(email))
      throw new Exception(ErrorsEnum.EMAIL_ALREADY_IN_USE);

    if (await this.usersRepository.findOneByUsername(username))
      throw new Exception(ErrorsEnum.USERNAME_ALREADY_IN_USE);

    return this.usersRepository.createUser(user);
  }

  /** @throws USER NOT FOUND | WRONG PASSWORD */
  async signIn({ identifier, password }: SignInDto) {
    const registeredUser =
      await this.usersRepository.findOneByIdentifier(identifier);

    if (!registeredUser) throw new Exception(ErrorsEnum.USER_NOT_FOUND);

    if (!(await registeredUser.comparePassword(password)))
      throw new Exception(ErrorsEnum.WRONG_PASSWORD);

    const token = await this.jwtService.signAsync({ id: registeredUser.id });

    const user = registeredUser;
    delete user.password;
    return { token, user };
  }

  /** @throws TOKEN EXPIRED | USER NOT FOUND | TOKEN INVALID */
  async me(token: string) {
    if (!token) throw new Exception(ErrorsEnum.TOKEN_INVALID);

    const jwt = await this.extractJWT(token);
    if (jwt.exp > Date.now()) throw new Exception(ErrorsEnum.TOKEN_EXPIRED);

    const user = await this.usersRepository.findOneById(jwt.id);
    if (!user) throw new Exception(ErrorsEnum.USER_NOT_FOUND);

    delete user.password;
    return user;
  }

  /** @throws TOKEN INVALID */
  private async extractJWT(token: string) {
    try {
      return this.jwtService.verify(token) as JWT;
    } catch (error) {
      throw new Exception(ErrorsEnum.TOKEN_INVALID);
    }
  }
}
