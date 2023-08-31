import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../users/dtos/sign-up.dto';
import { SignInDto } from '../users/dtos/sign-in.dto';
import ErrorHandler from '../common/classes/ErrorHandler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() user: SignUpDto) {
    try {
      return await this.authService.signUp(user);
    } catch ({ message }) {
      /** @receives USER NOT FOUND | WRONG PASSWORD */
      /** @throws BadRequestException */
      ErrorHandler.handle(message);
    }
  }

  @Post('/signin')
  async signIn(@Body() user: SignInDto) {
    console.log(user.identifier);
    try {
      return await this.authService.signIn(user);
    } catch ({ message }) {
      /** @receives WRONG PASSWORD | USER NOT FOUND */
      /** @throws BadRequestException | NotFoundException */
      ErrorHandler.handle(message);
    }
  }

  @Get('/me')
  async me(@Body() { token }: { token: string }) {
    try {
      return await this.authService.me(token);
    } catch ({ message }) {
      /** @receives TOKEN EXPIRED | USER NOT FOUND */
      /** @throws BadRequestException | NotFoundException */
      ErrorHandler.handle(message);
    }
  }
}