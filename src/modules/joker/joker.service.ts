import { Injectable } from '@nestjs/common';
import { JokerRepository } from './joker.repository';
import { ErrorsEnum } from '../../common/enums/errors.enum';

@Injectable()
export class JokerService {
  constructor(private readonly jokerRepository: JokerRepository) {}

  async createLobby(gameID: string, username: string) {
    const game = { gameID, p1: username };
    return this.jokerRepository.initializeGame(game);
  }

  async joinLobby(gameID: string, username: string) {
    const game = await this.jokerRepository.findGame(gameID);
    if (!game) throw new Error(ErrorsEnum.GAME_NOT_FOUND);

    if (!game.p2) game.p2 = username;
    else if (!game.p3) game.p3 = username;
    else if (!game.p4) game.p4 = username;
    else throw new Error(ErrorsEnum.GAME_FULL);

    this.jokerRepository.saveGame(game);
  }

  async leaveLobby(gameID: string, username: string) {
    const game = await this.jokerRepository.findGame(gameID);

    if (game.p1 === username && !game.p2 && !game.p3 && !game.p4)
      return this.jokerRepository.deleteGame(gameID);

    switch (username) {
      case game.p1:
        if (!game.p2 && !game.p3 && !game.p4)
          return this.jokerRepository.deleteGame(gameID);
        game.p1 = game?.p2;
        game.p2 = game?.p3;
        game.p3 = game?.p4;
        game.p4 = null;
      case game.p2:
        game.p2 = game?.p3;
        game.p3 = game?.p4;
        game.p4 = null;
      case game.p3:
        game.p3 = game?.p4;
        game.p4 = null;
    }

    this.jokerRepository.saveGame(game);
  }

  async getPlayers(gameID: string) {
    const game = await this.jokerRepository.findGame(gameID);
    const players: string[] = [];
    if (game.p1) players.push(game.p1);
    if (game.p2) players.push(game.p2);
    if (game.p3) players.push(game.p3);
    if (game.p4) players.push(game.p4);
    return players;
  }
}
