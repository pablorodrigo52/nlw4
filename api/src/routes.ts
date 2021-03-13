import { Request, Response, Router } from  "express";
import { UserController } from "./controllers/UserController";

const router = Router();

router.get("/", (request: Request, response: Response) => response.send("OK"));

router.post("/users", new UserController().create);


export { router }