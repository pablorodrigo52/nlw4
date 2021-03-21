import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/User';

// responsavel por se comunicar com o banco atraves do typeorm
@EntityRepository(User) 
class UserRepository extends Repository<User> {}

export { UserRepository };