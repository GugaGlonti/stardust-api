import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { ChatRepository } from './chat.repository';
import { SocketGateway } from '../socket/socket.gateway';
import { CurrentUserInterceptor } from '../../interceptors/current-user.interceptor';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { SocketService } from '../socket/socket.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
  ],
  providers: [
    SocketGateway,
    SocketService,
    ChatService,
    ChatRepository,
    CurrentUserInterceptor,
    AuthService,
    UsersRepository,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
