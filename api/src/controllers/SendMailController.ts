import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { UserRepository } from "../repositories/UserRepository";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import SendMailService from "../services/SendMailService";


class SendMailController{

	async execute(request: Request, response: Response){
		const {email, survey_id} = request.body;

		const userRepository = getCustomRepository(UserRepository);
		const surveyRepository = getCustomRepository(SurveyRepository);
		const surveyUserRepository = getCustomRepository(SurveyUserRepository);

		const userExists = await userRepository.findOne({ email });
		if (!userExists){
			return response.status(400).json({error: "User does not exists."});
		}

		const surveyExists = await surveyRepository.findOne({ id: survey_id });
		if (!surveyExists){
			return response.status(400).json({error: "Survey does not exists"});
		}

		const surveyUserExists = await surveyUserRepository.findOne({
			where: {user_id: userExists.id, value: null},
			relations: ["user", "survey"]
		});

		const variables = {
			name: userExists.name,
			title: surveyExists.title,
			description: surveyExists.description,
			id: "",
			link: process.env.URL_MAIL
		}

		if (surveyUserExists){
			variables.id = surveyUserExists.id;
			await SendMailService.execute(email, variables, "path_to_template_email");
			return response.json(surveyUserExists);	
		}

		// salvar as informações na tabela surveys_users
		const surveyUser = surveyUserRepository.create({
			user_id: userExists.id,
			survey_id
		});
		await surveyUserRepository.save(surveyUser);
		variables.id = surveyUser.id;
		// enviar email para o usuário
		await SendMailService.execute(email, variables, "path_to_template_email");
	
		return response.json(surveyUser);
	}
}

export { SendMailController };