/** @nest */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

/** @controllers */
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

/** @repositories */
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

/** @interceptors */
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
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
