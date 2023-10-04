/** @nest */
import { Controller, Get } from '@nestjs/common';

/** @services */
import { NotificationsService } from './notifications.service';

//api/notifications/
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('/test')
  getNotifications() {
    return 'Notifications';
  }
}
