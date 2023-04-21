import { User } from '../../user/entities/user.entity';
import { getRepository } from 'typeorm';

export const UserRepository = getRepository(User);
