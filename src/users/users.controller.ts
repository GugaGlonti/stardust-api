import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { UsersService } from './users.service';
import { ErrorsEnum } from '../common/enums/errors.enum';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async signUp(@Body() body: SignUpDto) {
    try {
      return await this.usersService.createUser(body);
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
  async signIn(@Body() body: SignInDto) {
    try {
      return await this.usersService.signIn(body);
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
