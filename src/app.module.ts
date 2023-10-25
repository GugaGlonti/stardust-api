/** @nest */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** @modules */
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

/** @controllers */
import { AppController } from './app.controller';

/** @services */
import { AppService } from './app.service';

/** @enities */
import { User } from './modules/users/user.entity';
import { Notification } from './modules/notifications/notification.entity';
import { ChatModule } from './modules/chat/chat.module';
import { Message } from './modules/chat/message.entity';
import { SocketModule } from './modules/socket/socket.module';
import { JokerModule } from './modules/joker/joker.module';
import { JokerGame } from './modules/joker/joker-game.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Notification, Message, JokerGame],
      synchronize: true,
    }),
    AuthModule,
    NotificationsModule,
    ChatModule,
    SocketModule,
    JokerModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
