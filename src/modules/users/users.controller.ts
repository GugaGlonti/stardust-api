/** @nest */
import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UseInterceptors,
  Query,
} from '@nestjs/common';

/** @services */
import { UsersService } from './users.service';

/** @errors */
import { UpdateProfileDataDto } from './dtos/update-profile-data.dto';

/** @decorators */
import { CurrentUser } from './decorators/current-user.decorator';

/** @entities */
import { User } from './user.entity';

/** @interceptors */
import { CurrentUserInterceptor } from '../../interceptors/current-user.interceptor';

/** @classes */
import ErrorHandler from '../../common/classes/ErrorHandler';

//api/users/
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('/updateProfile')
  @UseInterceptors(CurrentUserInterceptor)
  async updateProfile(
    @Body() updateProfileData: UpdateProfileDataDto,
    @CurrentUser() user: User,
  ) {
    try {
      return await this.usersService.updateProfile(updateProfileData, user);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @Get('/friends')
  async getFriends(@Query() query: { username: string }) {
    try {
      const { username } = query;
      return await this.usersService.getFriends(username);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @Get('/search')
  async searchUsers(@Query() _query: { query: string }) {
    try {
      const { query } = _query;
      return await this.usersService.searchUsersForSearchBar(query);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @Get('/:identifier')
  async getProfile(@Param('identifier') identifier: string) {
    try {
      return this.usersService.findOneByIdentifier(identifier);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }
}
