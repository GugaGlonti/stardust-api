/** @nest */
import {
  Controller,
  Get,
  Param,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

/** @services */
import { UsersService } from './users.service';

/** @errors */
import { ErrorsEnum } from '../common/enums/errors.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    try {
      return await this.usersService.findOneById(parseInt(id));
    } catch ({ message }) {
      switch (message) {
        case ErrorsEnum.USER_NOT_FOUND:
          throw new NotFoundException(message);
        default:
          throw new InternalServerErrorException(ErrorsEnum.UNKNOWN_ERROR);
      }
    }
  }
}
