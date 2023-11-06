import { IsNumber, IsString } from 'class-validator';
import { GameMode } from '../logic/GameMode';

export class StartGameDto {
  @IsString()
  gameID: string;

  @IsString()
  gameMode: GameMode;

  @IsNumber()
  roundCount: number;

  @IsNumber()
  penalty: number;

  @IsString()
  players: string;

  // @IsNumber()
  betAmount?: number;
}
