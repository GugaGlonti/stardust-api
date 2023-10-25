/** @nest */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** @controllers */
import { NotificationsController } from './notifications.controller';

/** @services */
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { NotificationsRepository } from './notifications.repository';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { jwtConstants } from '../../constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    NotificationsService,
    NotificationsRepository,
    AuthService,
    UsersService,
    UsersRepository,
  ],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
