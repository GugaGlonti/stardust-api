/**
 * @types INFO, ALERT, FRIEND_REQUEST, OFFER
 */

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  //==========// //==========// /* essential */ //==========////==========//

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: false, default: false })
  read: boolean;

  //==========// //==========// /* optional */ //==========////==========//

  @Column({ nullable: true })
  title: string;

  //TODO: RELATIONS
  @Column({ nullable: true })
  senderId: number;

  //TODO: RELATIONS
  @Column({ nullable: true })
  receiverId: number;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  link: string;

  //==========// //==========// /* methods */ //==========////==========//

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }
}
