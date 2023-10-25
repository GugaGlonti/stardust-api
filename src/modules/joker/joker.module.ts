import { Module } from '@nestjs/common';
import { JokerService } from './joker.service';
import { JokerController } from './joker.controller';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokerGame } from './joker-game.entity';
import { JokerRepository } from './joker.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([JokerGame]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
  ],
  controllers: [JokerController],
  providers: [JokerService, JokerRepository, AuthService, UsersRepository],
})
export class JokerModule {}
