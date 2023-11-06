import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { JokerService } from './joker.service';
import { CardID } from './logic/cardID.type';
import { Card } from './logic/Card';
import { RoundWinner } from './logic/Winner';

//api/joker/
@Controller('joker')
@UseInterceptors(ClassSerializerInterceptor)
export class JokerController {
  constructor(private readonly jokerService: JokerService) {
    //TODO: remove this
    const trump = 'd';
    const cardIDs: CardID[] = ['_0', '_1', '_0', 'd3'];
    const cards = cardIDs.map((card) => new Card(card, card, trump));

    const roundWinner = new RoundWinner(cards, trump);
    console.log(roundWinner.getName());
  }

  @Get('players')
  async getPlayers(@Body('gameID') gameID: string) {
    return this.jokerService.getPlayers(gameID);
  }

  @Get('game')
  async getGame(@Body('gameID') gameID: any) {
    return this.jokerService.getGame(gameID);
  }
}
