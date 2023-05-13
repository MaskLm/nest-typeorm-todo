import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { User } from '../../user/entities/user.entity';

@Entity()
@Unique('UQ_USER_USERNAME', ['username'])
@Unique('UQ_USER_EMAIL', ['email'])
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: true, nullable: false })
  activated: boolean;

  @Column({ default: false, nullable: false })
  admin: boolean;

  @OneToMany(() => User, (user) => user.account)
  users: User[];

  /*  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => Todo, (todo) => todo.account)
  todos: Todo[];*/

  @BeforeUpdate()
  @BeforeInsert()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
