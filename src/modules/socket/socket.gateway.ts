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
import { JokerService } from '../joker/joker.service';
import ErrorHandler from '../../common/classes/ErrorHandler';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';

@WebSocketGateway()
export class SocketGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly jokerService: JokerService,
    private readonly notificationService: NotificationsService,
    private readonly userService: UsersService,
  ) {
    //    setInterval(() => console.log(this.server.sockets.adapter.sids), 3000);
  }

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

  /** ========== // ======= @notifications ======== // ========== */
  @SubscribeMessage('sendFriendRequest')
  async sendNotification(@MessageBody() [me, friend]: [string, string]) {
    const meUser = await this.userService.findOneByIdentifier(me);
    this.notificationService.addFriendRequest(meUser, friend);
    this.server.in(friend).emit('refresh');
  }

  @SubscribeMessage('acceptFriendRequest')
  async acceptFriendRequest(@MessageBody() notificationId: number) {
    const { username } =
      await this.notificationService.acceptFriendRequest(notificationId);
    this.server.in(username).emit('refresh');
  }

  /** ========== // ========== @messages ========== // ========== */

  @SubscribeMessage('sendMessage')
  async create(@MessageBody() sendMessageDto: SendMessageDto) {
    try {
      const message = await this.chatService.addMessage(sendMessageDto);
      this.server.in(sendMessageDto.chatId).emit('newMessage');
      return message;
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  //TODO: implement pagination
  //TODO: implement typing
  //TODO: implement read
  //TODO: implement http first socket second
  @SubscribeMessage('getChatMessages')
  async getChatMessages(
    @MessageBody() chatId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(chatId);
    return this.chatService.getMessages(chatId);
  }

  /** ========== // ========== @joker ========== // ========== */
  @SubscribeMessage('joker-create')
  async createJoker(
    @MessageBody() [gameID, username]: [string, string],
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await client.join(gameID);
      await this.jokerService.createLobby(gameID, username);
      this.server.in(gameID).emit('lobby-update');
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @SubscribeMessage('joker-join')
  async joinJoker(
    @MessageBody() [gameID, username]: [string, string],
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await client.join(gameID);
      await this.jokerService.joinLobby(gameID, username);
      this.server.in(gameID).emit('lobby-update');
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @SubscribeMessage('joker-leave')
  async leaveJoker(
    @MessageBody() [gameID, username]: [string, string],
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await client.leave(gameID);
      await this.jokerService.leaveLobby(gameID, username);
      this.server.in(gameID).emit('lobby-update');
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }
}
