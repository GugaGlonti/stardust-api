/** @nest */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';

/** @services */
import { AuthService } from './auth.service';

/** @dtos */
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';

/** @classes */
import ErrorHandler from '../../common/classes/ErrorHandler';

/** @decorators */
import { CurrentUser } from '../users/decorators/current-user.decorator';

/** @entities */
import { User } from '../users/user.entity';

/** @interceptors */
import { CurrentUserInterceptor } from '../../interceptors/current-user.interceptor';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() user: SignUpDto) {
    try {
      const createdUser = await this.authService.signUp(user);
      delete createdUser.password;
      return createdUser;
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @Post('/signin')
  async signIn(@Body() user: SignInDto) {
    try {
      return await this.authService.signIn(user);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @Get('/me')
  @UseInterceptors(CurrentUserInterceptor)
  async me(@CurrentUser() me: User) {
    return me;
  }
}
