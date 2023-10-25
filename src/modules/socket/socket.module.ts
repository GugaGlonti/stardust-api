import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { ChatService } from '../chat/chat.service';
import { ChatRepository } from '../chat/chat.repository';
import { JokerService } from '../joker/joker.service';
import { JokerRepository } from '../joker/joker.repository';

@Module({
  providers: [
    SocketGateway,
    SocketService,
    ChatService,
    ChatRepository,
    JokerService,
    JokerRepository,
  ],
})
export class SocketModule {}
