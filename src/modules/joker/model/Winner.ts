import { Card } from './Card';

export class RoundWinner {
  public constructor(
    public cards: Card[],
    public trump: string,
  ) {}

  public getName(): string {
    const winner = this.cards[0]
      .beats(this.cards[1])
      .beats(this.cards[2])
      .beats(this.cards[3]);
    return winner.player;
  }
}
