import { CardID } from './cardID.type';

export class Card {
  public constructor(
    public cardId: CardID,
    public player: string,
    private trump: string,
  ) {}

  public match(enemy: Card): Card {
    if (enemy.getCardName() === 'Joker') return enemy;
    if (this.getCardName() === 'Joker') return this;
    if (this.getSuit() === enemy.getSuit()) {
      if (this.getNumber() > enemy.getNumber()) return this;
      return enemy;
    }
    if (enemy.getSuit() === this.trump) return enemy;
    return this;
  }

  getSuit() {
    return this.cardId.split('')[0];
  }

  getNumber() {
    return parseInt(this.cardId.split('')[1]);
  }

  getCardName() {
    const id = this.cardId;
    if (id === '__') return 'Flipped Card';
    if (id === '_0' || id === '_1') return 'Joker';

    const number = this.getNumber();
    let computedNumber;

    // prettier-ignore
    switch (number) {
      case 11:  computedNumber = 'Jack';  break;
      case 12:  computedNumber = 'Queen'; break;
      case 13:  computedNumber = 'King';  break;
      case 14:  computedNumber = 'Ace';   break;
      default:    computedNumber = number;
    }

    const suit = this.getSuit();
    let computedSuit;

    // prettier-ignore
    switch (suit) {
      case 'c': computedSuit = 'Clubs';     break;
      case 'd': computedSuit = 'Diamonds';  break;
      case 'h': computedSuit = 'Hearts';    break;
      case 's': computedSuit = 'Spades';    break;
      default:  computedSuit = 'INVALID CARD';
    }

    return `${computedNumber} of ${computedSuit} `;
  }
}
