import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorsEnum } from '../enums/errors.enum';

export default class ErrorHandler {
  public static handle(message: string) {
    switch (message) {
      case ErrorsEnum.EMAIL_ALREADY_IN_USE:
      case ErrorsEnum.USERNAME_ALREADY_IN_USE:
      case ErrorsEnum.TOKEN_EXPIRED:
      case ErrorsEnum.TOKEN_INVALID:
        throw new BadRequestException(message);
      case ErrorsEnum.USER_NOT_FOUND:
        throw new NotFoundException(message);
      case ErrorsEnum.WRONG_PASSWORD:
        throw new BadRequestException(message);
      default:
        console.log('PORBABLY FORGOT TO ADD A CASE TO THE ERROR HANDLER');
        throw new InternalServerErrorException(ErrorsEnum.UNKNOWN_ERROR);
    }
  }
}
