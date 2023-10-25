import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { JokerService } from './joker.service';
import ErrorHandler from '../../common/classes/ErrorHandler';
@Controller('joker')
@UseInterceptors(ClassSerializerInterceptor)
export class JokerController {
  constructor(private readonly jokerService: JokerService) {}

  @Get('players')
  async getPlayers(@Body('gameID') gameID: string) {
    try {
      return await this.jokerService.getPlayers(gameID);
    } catch ({ message }) {
      ErrorHandler.handle(message);
    }
  }
}