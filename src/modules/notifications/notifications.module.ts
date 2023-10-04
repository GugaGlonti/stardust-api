/** @nest */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** @controllers */
import { NotificationsController } from './notifications.controller';

/** @services */
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
