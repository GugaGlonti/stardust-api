import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { TestNotificationDto } from './dtos/test-notification.dto';

type Notification = TestNotificationDto | any;

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async addNotification(notification: Notification) {
    return this.notificationsRepository.addNotification(notification);
  }
}
