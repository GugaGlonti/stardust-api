/** @nest */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** @modules */
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

/** @controllers */
import { AppController } from './app.controller';

/** @services */
import { AppService } from './app.service';

/** @repositories */
import { User } from './modules/users/user.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
