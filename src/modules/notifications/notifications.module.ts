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
import { SocketService } from '../socket/socket.service';
import { SocketGateway } from '../socket/socket.gateway';
import { ChatService } from '../chat/chat.service';
import { ChatRepository } from '../chat/chat.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
  ],
  providers: [
    SocketGateway,
    SocketService,
    ChatService,
    ChatRepository,
    NotificationsService,
    NotificationsRepository,
    SocketService,
    AuthService,
    UsersService,
    UsersRepository,
  ],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
