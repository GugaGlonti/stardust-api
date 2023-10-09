/** @nest */
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';

/** @services */
import { NotificationsService } from './notifications.service';

/** @common */
import ErrorHandler from '../../common/classes/ErrorHandler';

/** @dtos */
import { FriendRequestDto } from './dtos/friend-request.dto';

/** @interceptors */
import { CurrentUserInterceptor } from '../../interceptors/current-user.interceptor';

/** @decorators */
import { CurrentUser } from '../users/decorators/current-user.decorator';

/** @entities */
import { User } from '../users/user.entity';

//api/notifications/
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseInterceptors(CurrentUserInterceptor)
  getNotifications(@CurrentUser() user: User) {
    try {
      const { id } = user;
      return this.notificationsService.getMyNotifications(id);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @Get('/count')
  @UseInterceptors(CurrentUserInterceptor)
  getNotificationCount(@CurrentUser() user: User) {
    try {
      const { id } = user;
      return this.notificationsService.getMyNotificationCount(id);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @Post('/sendFriendRequest')
  @UseInterceptors(CurrentUserInterceptor)
  async sendFriendRequest(
    @CurrentUser() sender: User,
    @Body() body: FriendRequestDto,
  ) {
    try {
      const reveicerUsername = body.username;
      return await this.notificationsService.addFriendRequest(
        sender,
        reveicerUsername,
      );
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }
}
