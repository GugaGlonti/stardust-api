/** @nest */
import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UseInterceptors,
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

  @Get('/:identifier')
  async findOneById(@Param('identifier') identifier: string) {
    try {
      return await this.usersService.findOneByIdentifier(identifier);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

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
}
