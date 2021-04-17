import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class AnswerController{

	// localhost:3333/answers/1?u=9273ad47-28b2-4b86-bee6-f481cd87d265
	async execute (request: Request, response: Response){
		const { value } = request.params;
		const { u } = request.query;

		const surveyUserRepository = getCustomRepository(SurveyUserRepository);

		const surveyUser = await surveyUserRepository.findOne({
			id: String(u)
		});

		if (!surveyUser){
			return response.status(400).json({error: "Survey User does not exists!"});
		}

		surveyUser.value = Number(value);
		await surveyUserRepository.save(surveyUser);
		return response.json(surveyUser);
	}
}

export  { AnswerController };