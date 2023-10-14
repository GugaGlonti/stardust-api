import { DataSource, Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';

@Injectable()
export class NotificationsRepository extends Repository<Notification> {
  constructor(private readonly dataSource: DataSource) {
    super(Notification, dataSource.createEntityManager());
  }

  /** @Repository @save */
  async addNotification(notification) {
    return this.save(Object.assign(new Notification(), { ...notification }));
  }

  async findOneById(id: number) {
    return this.findOne({ where: { id } });
  }

  async findOneByIdWithFirends(id: number) {
    return this.findOne({
      where: { id },
      relations: ['sender', 'receiver'],
    });
  }

  async getMyNotifications(id: number) {
    return this.find({ where: { receiverId: id }, order: undefined });
  }

  async getMyNotificationCount(id: number) {
    return this.count({ where: { receiverId: id } });
  }

  async findFriendRequest(sender: User, reveicer: User) {
    return this.findOne({
      where: { senderId: sender.id, receiverId: reveicer.id },
    });
  }
}
