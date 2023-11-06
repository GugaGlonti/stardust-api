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
    return this.notificationsService.getMyNotifications(user.id);
  }

  @Get('/count')
  getNotificationCount(@CurrentUser() user: User) {
    return this.notificationsService.getMyNotificationCount(user.id);
  }

  @Post('/sendFriendRequest')
  async sendFriendRequest(
    @CurrentUser() sender: User,
    @Body() body: FriendRequestDto,
  ) {
    const reveicerUsername = body.username;
    return await this.notificationsService.addFriendRequest(
      sender,
      reveicerUsername,
    );
  }

  @Put('/declineFriendRequest')
  async declineFriendRequest(@Body() body: { notificationId: number }) {
    const { notificationId } = body;
    return await this.notificationsService.deleteNotification(notificationId);
  }

  @Delete('/:id')
  deleteNotification(@Param('id') id: number) {
    return this.notificationsService.deleteNotification(id);
  }
}
