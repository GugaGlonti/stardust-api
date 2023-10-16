import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { ChatRepository } from './chat.repository';
import { ChatGateway } from './chat.gateway';
import { CurrentUserInterceptor } from '../../interceptors/current-user.interceptor';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
  ],
  providers: [
    ChatService,
    ChatRepository,
    ChatGateway,
    CurrentUserInterceptor,
    AuthService,
    UsersRepository,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
