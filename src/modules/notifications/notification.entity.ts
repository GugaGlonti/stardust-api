import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  //==========// //==========// /* essential */ //==========////==========//

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  createdAt: Date;

  //==========// //==========// /* optional */ //==========////==========//

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  read: boolean;

  //==========// //==========// /* methods */ //==========////==========//

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }
}
