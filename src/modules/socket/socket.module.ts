import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { ChatService } from '../chat/chat.service';
import { ChatRepository } from '../chat/chat.repository';

@Module({
  providers: [SocketGateway, SocketService, ChatService, ChatRepository],
})
export class SocketModule {}
