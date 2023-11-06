import { JokerGame } from '../joker-game.entity';
import { Server } from 'socket.io';

export class GameManager {
  private roundTime = 30 * 10 * 4; // 30 seconds
  private roundTimer: NodeJS.Timeout;
  private round: number;

  private playerTime = 30 * 10;
  private playerTimer: NodeJS.Timeout;
  private playerIndex: number;
  private players: string[];

  private roundSequence: number[] = [];

  // TODO: private betAmount: number;
  private gameMode: string;
  private roundCount: number;
  private penalty: number;

  private gameID: string;

  public constructor(
    private readonly game: JokerGame,
    private readonly server: Server,
  ) {
    // TODO: this.betAmount = game.betAmount;
    this.gameID = game.gameID;
    this.players = [game.p1, game.p2, game.p3, game.p4];
    this.gameMode = game.gameMode;
    this.roundCount = game.roundCount;
    this.penalty = game.penalty;

    this.server.in(this.gameID).emit('joker-start');
    this.getRoundSequence();
    this.init();
  }

  private init() {
    console.log(this.roundSequence);
    console.log(this.server.sockets.adapter.sids);
    this.nextRound();
  }

  private nextRound() {
    if (!this.roundSequence.length) return this.endGame();
    this.round = this.roundSequence.pop();

    this.playerIndex = 0;
    console.log(this.round);
    this.nextPlayer();

    this.server.in(this.gameID).emit('joker-next-round', this.round);
    this.roundTimer = setTimeout(() => this.nextRound(), this.roundTime);
  }

  private nextPlayer() {
    if (this.playerIndex >= 4) return;
    console.log(this.players[this.playerIndex]);
    this.server
      .in(this.gameID)
      .emit('joker-next-player', this.players[this.playerIndex]);
    this.playerIndex++;
    this.playerTimer = setTimeout(() => this.nextPlayer(), this.playerTime);
  }
  private endGame() {
    console.log('end');
  }

  private getRoundSequence() {
    if (this.gameMode === 'nines')
      for (let i = 0; i < this.roundCount; i++)
        this.roundSequence.push(...[9, 9, 9, 9]);

    if (this.gameMode === 'classical')
      for (let i = 0; i < this.roundCount; i++) {
        if (i % 4 === 0) this.roundSequence.push(...[1, 2, 3, 4, 5, 6, 7, 8]);
        if (i % 4 === 2) this.roundSequence.push(...[8, 7, 6, 5, 4, 3, 2, 1]);
        if (i % 4 === 1 || i % 4 === 3)
          this.roundSequence.push(...[9, 9, 9, 9]);
      }
    this.roundSequence.reverse();
  }
}
