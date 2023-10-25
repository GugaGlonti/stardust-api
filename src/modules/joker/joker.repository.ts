import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { JokerGame } from './joker-game.entity';

@Injectable()
export class JokerRepository extends Repository<JokerGame> {
  constructor(private readonly dataSource: DataSource) {
    super(JokerGame, dataSource.createEntityManager());
  }

  /** @Repository @initialize */
  async initializeGame(game: Partial<JokerGame>) {
    return this.save(Object.assign(new JokerGame(), { ...game }));
  }

  async saveGame(game: Partial<JokerGame>) {
    return this.save(Object.assign(new JokerGame(), { ...game }));
  }

  async deleteGame(gameID: string) {
    return this.delete({ gameID });
  }

  async findGame(gameID: string) {
    return this.findOne({ where: { gameID } });
  }
}
