import { Card } from './Card';

export class RoundWinner {
  public constructor(
    public cards: Card[],
    public trump: string,
  ) {}

  public getName(): string {
    const winner = this.cards[0]
      .match(this.cards[1])
      .match(this.cards[2])
      .match(this.cards[3]);
    return winner.player;
  }
}
