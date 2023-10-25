/** @nest */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

/** @controllers */
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

/** @repositories */
import { UsersRepository } from './users.repository';

/** @entities */
import { User } from './user.entity';

/** @interceptors */
import { CurrentUserInterceptor } from '../../interceptors/current-user.interceptor';
import { AuthService } from '../auth/auth.service';
import { jwtConstants } from '../../constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    UsersRepository,
    CurrentUserInterceptor,
  ],
  exports: [UsersService],
})
export class UsersModule {}
