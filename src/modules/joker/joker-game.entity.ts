import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class JokerGame {
  @PrimaryColumn()
  gameID: string;

  /** ========== @Options ========== */
  @Column({ nullable: true })
  gameMode: string;

  @Column({ nullable: true })
  penalty: number;

  @Column({ nullable: true })
  rounds: number;

  /** =========== @Clock =========== */
  @Column({ nullable: true })
  turn: string;

  /** =========== @Admin =========== */
  @Column({ nullable: false })
  p1: string;

  @Column({ nullable: true })
  p1cards: string;

  @Column({ nullable: true })
  p1points: number;

  /** ========== @Player2 ========== */
  @Column({ nullable: true })
  p2: string;

  @Column({ nullable: true })
  p2cards: string;

  @Column({ nullable: true })
  p2points: number;

  /** ========== @Player3 ========== */
  @Column({ nullable: true })
  p3: string;

  @Column({ nullable: true })
  p3cards: string;

  @Column({ nullable: true })
  p3points: number;

  /** ========== @Player4 ========== */
  @Column({ nullable: true })
  p4: string;

  @Column({ nullable: true })
  p4cards: string;

  @Column({ nullable: true })
  p4points: number;
}
