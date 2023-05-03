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
import { Todo } from '../../todo/entities/todo.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique('UQ_USER_USERNAME', ['username'])
@Unique('UQ_USER_EMAIL', ['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: false, nullable: false })
  admin: boolean;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @BeforeInsert()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
