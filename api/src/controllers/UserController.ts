import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

/* não  e responsabilidade do controller acessar banco de dados.. */
class UserController{

	async create(request: Request, response: Response)
	{
		const { name, email } = request.body;
		const userRepository = getCustomRepository(UserRepository); // entidade criada em 'models/' essa é a 'conexão' entre o meu código e a tabela do banco.. nesse exemplo é a tabela User

		// SELECT * FROM users WHERE email = $email;
		const userAlreadyExists = await userRepository.findOne({ email });

		if (userAlreadyExists)
		{
			return response.status(400).json({error: "User alreaty exists!"});
		}
		else
		{
			/* crio uma alteração... */
			const user = userRepository.create({ name, email });
			/* dou um 'commit' na alteração realizada acima com o método .save() que me retorna um objeto que foi inserido no banco */
			return response.status(201).send(await userRepository.save(user));
		}
	}
}

export { UserController }