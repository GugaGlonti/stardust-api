import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { ChatService } from '../chat/chat.service';
import { ChatRepository } from '../chat/chat.repository';
import { JokerService } from '../joker/joker.service';
import { JokerRepository } from '../joker/joker.repository';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { NotificationsRepository } from '../notifications/notifications.repository';

@Module({
  providers: [
    SocketGateway,
    SocketService,
    ChatService,
    ChatRepository,
    JokerService,
    JokerRepository,
    UsersService,
    UsersRepository,
    NotificationsService,
    NotificationsRepository,
  ],
})
export class SocketModule {}
