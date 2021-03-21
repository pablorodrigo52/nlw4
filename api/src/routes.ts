import { Request, Response, Router } from  "express";
import { UserController } from "./controllers/UserController";
import { SurveyController } from "./controllers/SurveyController";

const router = Router();

router.get("/", (request: Request, response: Response) => response.send("OK"));

router.post("/users", new UserController().create);

router.get("/surveys", new SurveyController().show);
router.post("/surveys", new SurveyController().create);

export { router }