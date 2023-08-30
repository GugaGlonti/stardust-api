import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../users/dtos/sign-up.dto';
import { ErrorsEnum } from '../common/enums/errors.enum';
import { SignInDto } from '../users/dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() user: SignUpDto) {
    try {
      return await this.authService.signUp(user);
    } catch ({ message }) {
      switch (message) {
        case ErrorsEnum.EMAIL_ALREADY_IN_USE:
        case ErrorsEnum.USERNAME_ALREADY_IN_USE:
          throw new BadRequestException(message);
        default:
          throw new InternalServerErrorException(ErrorsEnum.UNKNOWN_ERROR);
      }
    }
  }

  @Post('/signin')
  async signIn(@Body() user: SignInDto) {
    try {
      return await this.authService.signIn(user);
    } catch ({ message }) {
      switch (message) {
        case ErrorsEnum.USER_NOT_FOUND:
          throw new NotFoundException(message);
        case ErrorsEnum.WRONG_PASSWORD:
          throw new BadRequestException(message);
        default:
          throw new InternalServerErrorException(ErrorsEnum.UNKNOWN_ERROR);
      }
    }
  }
}
