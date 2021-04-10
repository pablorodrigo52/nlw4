import { Request, Response, Router } from  "express";
import { UserController } from "./controllers/UserController";
import { SurveyController } from "./controllers/SurveyController";
import { SendMailController } from "./controllers/SendMailController";

const router = Router();

router.get("/", (request: Request, response: Response) => response.send("OK"));

router.post("/users", new UserController().create);

router.get("/surveys", new SurveyController().show);
router.post("/surveys", new SurveyController().create);

router.post("/sendMail", new SendMailController().execute);

export { router }