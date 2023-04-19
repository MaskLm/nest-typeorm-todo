import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { TodosEntity } from '../todos/todos.entity';

@Entity()
@Unique('UQ_USER_USERNAME', ['username'])
@Unique('UQ_USER_EMAIL', ['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: false, nullable: false })
  admin: boolean;

  @OneToMany(() => TodosEntity, (todo) => todo.user)
  todos: TodosEntity[];
}
