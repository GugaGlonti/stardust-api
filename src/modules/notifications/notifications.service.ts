import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { ErrorsEnum } from '../../common/enums/errors.enum';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { NotificationEnum } from '../../common/enums/notification.enum';
import { WebSocketServer } from '@nestjs/websockets';

import { Server } from 'socket.io';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly usersService: UsersService,
  ) {}

  @WebSocketServer()
  server: Server;

  getMyNotifications = async (id: number) =>
    this.notificationsRepository.getMyNotifications(id);

  getMyNotificationCount = async (id: number) =>
    this.notificationsRepository.getMyNotificationCount(id);

  deleteNotification = async (id: number) =>
    this.notificationsRepository.delete(id);

  async addFriendRequest(sender: User, reveicerUsername: string) {
    const receiver =
      await this.usersService.findOneByIdentifier(reveicerUsername);

    if (await this.friendRequestExists(sender, receiver))
      throw new Error(ErrorsEnum.DUPLICATE_REQUEST);

    if (await this.usersService.areFriends(sender, receiver))
      throw new Error(ErrorsEnum.ALREADY_FRIENDS);

    const friendRequest = {
      senderId: sender.id,
      receiverId: receiver.id,
      type: NotificationEnum.FRIEND_REQUEST,
    };

    // console.log(receiver.username);

    //  this.socketGateway.server
    //    .in(receiver.username)
    //    .emit('newNotification', "You've got a new friend request");
    return this.notificationsRepository.addNotification(friendRequest);
  }

  async friendRequestExists(sender: User, receiver: User) {
    return !!(await this.notificationsRepository.findFriendRequest(
      sender,
      receiver,
    ));
  }

  async acceptFriendRequest(notificationId: number) {
    this.resolveFriendRequest(notificationId);
    this.deleteNotification(notificationId);
    this.sendFriendConfiramtion(notificationId);
    const notification =
      await this.notificationsRepository.findOneById(notificationId);
    return this.usersService.findOneById(notification.senderId);
  }

  async resolveFriendRequest(id: number) {
    const friendRequest = await this.notificationsRepository.findOneById(id);
    if (!friendRequest) throw new Error(ErrorsEnum.NOTIFICATION_NOT_FOUND);

    const { senderId, receiverId } = friendRequest;
    const user1 = await this.usersService.findOneByIdWithFirends(senderId);
    const user2 = await this.usersService.findOneByIdWithFirends(receiverId);
    if (!user1 || !user2) throw new Error(ErrorsEnum.USER_NOT_FOUND);

    return this.usersService.addFriend(user1, user2);
  }

  async sendFriendConfiramtion(id: number) {
    const friendRequest = await this.notificationsRepository.findOneById(id);
    if (!friendRequest) throw new Error(ErrorsEnum.NOTIFICATION_NOT_FOUND);

    const { senderId, receiverId } = friendRequest;
    const { username } = await this.usersService.findOneById(receiverId);
    const notification = {
      receiverId: senderId,
      type: NotificationEnum.INFO,
      title: 'Friend request accepted',
      body: `@${username} has accepted your friend request`,
    };

    //  const reveicer = await this.usersService.findOneById(receiverId);

    //  console.log(reveicer.username);

    //  this.socketGateway.server
    //    .in(reveicer.username)
    //    .emit('newNotification', 'Your friend request was accepted');
    return this.notificationsRepository.addNotification(notification);
  }

  async rejectFriendRequest() {}
}
