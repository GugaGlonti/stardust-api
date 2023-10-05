/** @nest */
import { Body, Controller, Get, Post } from '@nestjs/common';

/** @services */
import { NotificationsService } from './notifications.service';

/** @common */
import ErrorHandler from '../../common/classes/ErrorHandler';

/** @dtos */
import { TestNotificationDto } from './dtos/test-notification.dto';

//api/notifications/
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('/test')
  async addNotification(@Body() notification: TestNotificationDto) {
    try {
      return await this.notificationsService.addNotification(notification);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @Get('/test')
  getNotifications() {
    return 'Notifications';
  }
}
