import { Injectable } from '@nestjs/common';
import { CardID } from '../joker/logic/cardID.type';
import { Card } from '../joker/logic/Card';
import { RoundWinner } from '../joker/logic/Winner';

@Injectable()
export class SocketService {
  constructor() {
    const trump = 'd';
    const cardIDs: CardID[] = ['_0', '_1', '_0', 'd3'];
    const cards = cardIDs.map((card) => new Card(card, card, trump));

    const roundWinner = new RoundWinner(cards, trump);
    console.log(roundWinner.getName());
  }
}
