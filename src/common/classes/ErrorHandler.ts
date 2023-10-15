import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ErrorsEnum } from '../enums/errors.enum';

export default class ErrorHandler {
  /**
   * Throws a general error based on the message ENUM
   * @param message ENUM
   */
  public static handle(message: string) {
    switch (message) {
      case ErrorsEnum.EMAIL_ALREADY_IN_USE:
      case ErrorsEnum.USERNAME_ALREADY_IN_USE:
      case ErrorsEnum.USER_ALREADY_EXISTS:
      case ErrorsEnum.DUPLICATE_REQUEST:
      case ErrorsEnum.ALREADY_FRIENDS:
        throw new BadRequestException(message);

      case ErrorsEnum.TOKEN_EXPIRED:
      case ErrorsEnum.TOKEN_INVALID:
        throw new UnauthorizedException(message);

      case ErrorsEnum.USER_NOT_FOUND:
      case ErrorsEnum.NOTIFICATION_NOT_FOUND:
        throw new NotFoundException(message);

      case ErrorsEnum.WRONG_PASSWORD:
        throw new BadRequestException(message);

      default:
        console.log('\x1b[41m%s\x1b[0m', message, '\x1b[47m%s\x1b[0m');
        throw new InternalServerErrorException(message);
    }
  }
}
