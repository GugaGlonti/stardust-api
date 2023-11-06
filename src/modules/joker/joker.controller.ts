import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { JokerService } from './joker.service';

//api/joker/
@Controller('joker')
@UseInterceptors(ClassSerializerInterceptor)
export class JokerController {
  constructor(private readonly jokerService: JokerService) {}

  @Get('players')
  async getPlayers(@Body('gameID') gameID: string) {
    return this.jokerService.getPlayers(gameID);
  }

  @Get('game')
  async getGame(@Body('gameID') gameID: any) {
    return this.jokerService.getGame(gameID);
  }
}
