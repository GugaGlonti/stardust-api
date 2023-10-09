import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { ErrorsEnum } from '../../common/enums/errors.enum';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly usersService: UsersService,
  ) {}

  async getMyNotifications(id: number) {
    return this.notificationsRepository.getMyNotifications(id);
  }

  async getMyNotificationCount(id: number) {
    return this.notificationsRepository.getMyNotificationCount(id);
  }

  async addFriendRequest(sender: User, reveicerUsername: string) {
    const receiver =
      await this.usersService.findOneByIdentifier(reveicerUsername);

    if (await this.friendRequestExists(sender, receiver))
      throw new Error(ErrorsEnum.DUPLICATE_REQUEST);

    const friendRequest = {
      senderId: sender.id,
      receiverId: receiver.id,
      type: 'FRIEND_REQUEST',
    };

    return this.notificationsRepository.addNotification(friendRequest);
  }

  async friendRequestExists(sender: User, receiver: User) {
    return !!(await this.notificationsRepository.findFriendRequest(
      sender,
      receiver,
    ));
  }
}
