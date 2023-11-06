/** @nest */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

/** @services */
import { AuthService } from './auth.service';

/** @dtos */
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';

/** @decorators */
import { CurrentUser } from '../users/decorators/current-user.decorator';

/** @entities */
import { User } from '../users/user.entity';

/** @interceptors */
import { CurrentUserInterceptor } from '../../interceptors/current-user.interceptor';

/** @guards */
import { AuthGuard } from '../../guards/auth.guard';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationsService,
    private readonly userService: UsersService,
  ) {}

  @Post('/signup')
  async signUp(@Body() user: SignUpDto) {
    const createdUser = await this.authService.signUp(user);
    delete createdUser.password;
    return createdUser;
  }

  @Post('/signin')
  async signIn(@Body() user: SignInDto) {
    return this.authService.signIn(user);
  }

  @Get('/me')
  @UseInterceptors(CurrentUserInterceptor)
  async me(@CurrentUser() me: User) {
    const notificationCount =
      await this.notificationService.getMyNotificationCount(me.id);
    const friends = await this.userService.getFriends(me.username);
    return { ...me, notificationCount, friends };
  }

  @Get('testGuard')
  @UseGuards(AuthGuard)
  async testGuard() {
    return 'works';
  }
}
