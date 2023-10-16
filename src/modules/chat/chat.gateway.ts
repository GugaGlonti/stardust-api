import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async create(@MessageBody() sendMessageDto: SendMessageDto) {
    const message = await this.chatService.addMessage(sendMessageDto);
    this.server.in(sendMessageDto.chatId).emit('newMessage');
    return message;
  }

  @SubscribeMessage('getChatMessages')
  async getChatMessages(
    @MessageBody() chatId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(chatId);
    return this.chatService.getMessages(chatId);
  }

  //TODO: implement typing
  @SubscribeMessage('typing')
  async typing() {}
}
