/** @nest */
import { Body, Controller, Get, Headers, Post } from '@nestjs/common';

/** @services */
import { AuthService } from './auth.service';

/** @dtos */
import { SignUpDto } from '../users/dtos/sign-up.dto';
import { SignInDto } from '../users/dtos/sign-in.dto';

/** @classes */
import ErrorHandler from '../common/classes/ErrorHandler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() user: SignUpDto) {
    try {
      const createdUser = await this.authService.signUp(user);
      delete createdUser.password;
      return createdUser;
    } catch ({ message }) {
      /** @receives USER NOT FOUND | WRONG PASSWORD */
      /** @throws BadRequestException */
      ErrorHandler.handle(message);
    }
  }

  @Post('/signin')
  async signIn(@Body() user: SignInDto) {
    try {
      return await this.authService.signIn(user);
    } catch ({ message }) {
      /** @receives WRONG PASSWORD | USER NOT FOUND */
      /** @throws BadRequestException | NotFoundException */
      ErrorHandler.handle(message);
    }
  }

  @Get('/me')
  async me(@Headers() headers: { authorization: string }) {
    try {
      const token = headers.authorization.split(' ')[1];
      return await this.authService.me(token);
    } catch ({ message }) {
      /** @receives TOKEN EXPIRED | USER NOT FOUND | TOKEN INVALID */
      /** @throws BadRequestException | UnauthorizedException | NotFoundException */
      ErrorHandler.handle(message);
    }
  }
}
