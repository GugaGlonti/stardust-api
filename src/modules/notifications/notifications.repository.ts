import { DataSource, Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsRepository extends Repository<Notification> {
  constructor(private readonly dataSource: DataSource) {
    super(Notification, dataSource.createEntityManager());
  }

  /** @Repository @save */
  async addNotification(notification: Notification) {
    return await this.save(
      Object.assign(new Notification(), { ...notification }),
    );
  }
}
