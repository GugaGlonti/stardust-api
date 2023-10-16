import { Controller, Get, Query } from '@nestjs/common';

import { ChatService } from './chat.service';
import ErrorHandler from '../../common/classes/ErrorHandler';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/getChatIdentifier')
  async getChatIdentifier(
    @Query() { friend, username }: { friend: string; username: string },
  ) {
    try {
      const hash = await this.chatService.getChatId(friend, username);
      return { id: hash, username, friend };
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }
}
