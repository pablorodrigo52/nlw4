import { EntityRepository, Repository } from 'typeorm';
import { SurveyUser } from '../models/SurveyUser';

// responsavel por se comunicar com o banco atraves do typeorm   
@EntityRepository(SurveyUser) 
class SurveyUserRepository extends Repository<SurveyUser> {}

export { SurveyUserRepository };