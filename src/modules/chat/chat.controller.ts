import { Controller, Get, Query } from '@nestjs/common';

import { ChatService } from './chat.service';
import ErrorHandler from '../../common/classes/ErrorHandler';
import { User } from '../users/user.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/getChatIdentifier')
  async getChatIdentifier(
    @Query()
    {
      friend: { username: friend },
      username,
    }: {
      friend: User;
      username: string;
    },
  ) {
    try {
      const hash = await this.chatService.getChatId(friend, username);
      const lastMessage = await this.chatService.getLastMessage(hash);
      return { id: hash, username, friend: friend, lastMessage };
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }
}
