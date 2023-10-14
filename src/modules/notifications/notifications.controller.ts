/** @nest */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

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
@UseInterceptors(CurrentUserInterceptor)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getNotifications(@CurrentUser() user: User) {
    try {
      const { id } = user;
      return this.notificationsService.getMyNotifications(id);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @Get('/count')
  getNotificationCount(@CurrentUser() user: User) {
    try {
      const { id } = user;
      return this.notificationsService.getMyNotificationCount(id);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @Post('/sendFriendRequest')
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

  @Put('/acceptFriendRequest')
  async acceptFriendRequest(@Body() body: { notificationId: number }) {
    try {
      const { notificationId } = body;
      this.notificationsService.resolveFriendRequest(notificationId);
      this.notificationsService.deleteNotification(notificationId);
      this.notificationsService.sendFriendConfiramtion(notificationId);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @Put('/declineFriendRequest')
  async declineFriendRequest(@Body() body: { notificationId: number }) {
    try {
      const { notificationId } = body;
      return await this.notificationsService.deleteNotification(notificationId);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }

  @Delete('/:id')
  deleteNotification(@Param('id') id: number) {
    try {
      console.log(id);
      return this.notificationsService.deleteNotification(id);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }
}
