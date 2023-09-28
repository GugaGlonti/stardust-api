/** @nest */
import {
  Controller,
  Get,
  Param,
  InternalServerErrorException,
  NotFoundException,
  Put,
  Body,
} from '@nestjs/common';

/** @services */
import { UsersService } from './users.service';

/** @errors */
import { ErrorsEnum } from '../common/enums/errors.enum';
import { UpdateProfileDataDto } from './dtos/update-profile-data.dto';

//api/users/
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:identifier')
  async findOneById(@Param('identifier') identifier: string) {
    try {
      return await this.usersService.findOneByIdentifier(identifier);
    } catch ({ message }) {
      switch (message) {
        case ErrorsEnum.USER_NOT_FOUND:
          throw new NotFoundException(message);
        default:
          throw new InternalServerErrorException(ErrorsEnum.UNKNOWN_ERROR);
      }
    }
  }

  @Put('/updateProfile')
  async updateProfile(@Body() updateProfileData: UpdateProfileDataDto) {
    try {
      return await this.usersService.updateProfile(updateProfileData);
    } catch ({ message }) {
      switch (message) {
        case null:
          null;
        default:
          throw new InternalServerErrorException(ErrorsEnum.UNKNOWN_ERROR);
      }
    }
  }
}
