import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SendMessageDto } from '../chat/dto/send-message.dto';
import { ChatService } from '../chat/chat.service';

@WebSocketGateway()
export class SocketGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  joinRoom(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    client.leave(room);
  }

  @SubscribeMessage('leaveRooms')
  leaveRooms(@ConnectedSocket() client: Socket) {
    client.rooms.forEach((room) => client.leave(room));
  }

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
