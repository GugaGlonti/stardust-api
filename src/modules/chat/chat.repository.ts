import { DataSource, Repository } from 'typeorm';
import { Message } from './message.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatRepository extends Repository<Message> {
  constructor(private readonly dataSource: DataSource) {
    super(Message, dataSource.createEntityManager());
  }

  /** @Repository @save */
  async addMessage(message) {
    return this.save(Object.assign(new Message(), { ...message }));
  }

  async findAll(chatId: string) {
    return this.find({ where: { chatId } });
  }

  async findLastMessage(chatId: string) {
    return this.findOne({ where: { chatId }, order: { timestamp: 'DESC' } });
  }

  async findOneById(id: number) {
    return this.findOne({ where: { id } });
  }
}
