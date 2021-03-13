import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController{

	async create(request: Request, response: Response)
	{
		const { name, email } = request.body;
		const userRepository = getRepository(User); // entidade criada em 'models/' essa é a 'conexão' entre o meu código e a tabela do banco.. nesse exemplo é a tabela User

		// SELECT * FROM users WHERE email = $email;
		const userAlreadyExists = await userRepository.findOne({
			email
		});

		if (userAlreadyExists)
		{
			return response.status(400).json({error: "User alreaty exists!"});
		}
		else
		{
			/* crio uma alteração... */
			const user = userRepository.create({
				name,
				email
			});
			/* dou um 'commit' na alteração realizada acima com o método .save() */
			return response.send(await userRepository.save(user));
		}
	}
}

export { UserController }