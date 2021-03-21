import { EntityRepository, Repository } from 'typeorm';
import { Survey } from '../models/Survey';

// responsavel por se comunicar com o banco atraves do typeorm
@EntityRepository(Survey) 
class SurveyRepository extends Repository<Survey> {}

export { SurveyRepository };