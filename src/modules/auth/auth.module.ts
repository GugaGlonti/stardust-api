/** @nest */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

/** @controllers */
import { AuthController } from './auth.controller';

/** @services */
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

/** @repositories */
import { User } from '../users/user.entity';
import { UsersRepository } from '../users/users.repository';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsRepository } from '../notifications/notifications.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UsersRepository,
    NotificationsService,
    NotificationsRepository,
  ],
})
export class AuthModule {}
