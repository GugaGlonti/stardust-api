import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Message {
  //==========// //==========// /* essential */ //==========////==========//
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  chatId: string;

  @Column({ nullable: false })
  sender: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  timestamp: Date;

  @Column({ nullable: false, default: false })
  read: boolean;

  //==========// //==========// /* optional */ //==========////==========//

  @Column({ nullable: true })
  image: string;

  //==========// //==========// /* methods */ //==========////==========//

  @BeforeInsert()
  setTimestamp() {
    this.timestamp = new Date();
  }
}
