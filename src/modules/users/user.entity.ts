import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  //==========// //==========// /*  auth  */ //==========////==========//

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: false, default: 'USER' })
  authLevel: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  //==========// //==========// /* profile */ //==========////==========//

  @ManyToMany(() => User)
  @JoinTable()
  friends: User[];

  @Column({ type: 'decimal', nullable: false, default: 10000 })
  balance: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true }) // OPTIONAL
  profilePicture: string;

  @Column({ nullable: true }) // OPTIONAL
  dateOfBirth: Date;

  @Column({ nullable: true }) // OPTIONAL
  phoneNumber: string;

  @Column({ nullable: true }) // OPTIONAL
  address: string;

  @Column({ nullable: true }) // OPTIONAL
  city: string;

  @Column({ nullable: true }) // OPTIONAL
  state: string;

  @Column({ nullable: true }) // OPTIONAL
  country: string;

  //==========// //==========// /* methods */ //==========////==========//

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async updatePassword(): Promise<void> {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}
