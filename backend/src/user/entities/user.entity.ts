import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { Todo } from '../../todo/entities/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  displayName: string;

  @Column({ nullable: true })
  public_emails: string[];

  @Column()
  avatarUrl: string;

  @ManyToOne(() => Account, (account) => account.users)
  account: Account;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
