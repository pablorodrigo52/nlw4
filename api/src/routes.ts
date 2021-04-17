import { Request, Response, Router } from  "express";
import { UserController } from "./controllers/UserController";
import { SurveyController } from "./controllers/SurveyController";
import { SendMailController } from "./controllers/SendMailController";
import { AnswerController } from './controllers/AnswerController';

const router = Router();

router.get("/", (request: Request, response: Response) => response.send("OK"));

router.post("/users", new UserController().create);
router.get("/surveys", new SurveyController().show);
router.post("/surveys", new SurveyController().create);
router.post("/sendMail", new SendMailController().execute);
router.get("/answers/:value", new AnswerController().execute);

export { router }