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
import { AuthService } from '../auth/auth.service';

/** @errors */
import { UpdateProfileDataDto } from './dtos/update-profile-data.dto';

/** @decorators */
import { CurrentUser } from './decorators/current-user.decorator';

/** @entities */
import { User } from './user.entity';

/** @interceptors */
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

/** @classes */
import ErrorHandler from '../common/classes/ErrorHandler';

//api/users/
@Controller('users')
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Put('/updateProfile')
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

  @Get('/search')
  async searchUsers(@Query() _query: { query: string }) {
    try {
      const { query } = _query;
      return await this.usersService.searchUsersForSearchBar(query);
    } catch (error) {}
  }

  @Get('/:identifier')
  async findOneById(@Param('identifier') identifier: string) {
    try {
      return await this.usersService.findOneByIdentifier(identifier);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }
}
