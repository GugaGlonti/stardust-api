import { Injectable } from '@nestjs/common';

import { ChatRepository } from './chat.repository';
import { SendMessageDto } from './dto/send-message.dto';

//eslint-disable-next-line
const crypto = require('crypto');

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  getMessages(chatId: string) {
    return this.chatRepository.findAll(chatId);
  }

  async addMessage(sendMessageDto: SendMessageDto) {
    return await this.chatRepository.addMessage(sendMessageDto);
  }

  async getLastMessage(chatId: string) {
    return await this.chatRepository.findLastMessage(chatId);
  }

  async getChatId(friend: string, username: string) {
    const jointHash = [this.idHash(friend), this.idHash(username)]
      .sort()
      .join('');
    return this.idHash(jointHash);
  }

  idHash(data: string) {
    return crypto.createHash('md5').update(data).digest('hex');
  }
}
