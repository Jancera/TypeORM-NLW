import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, firstName, channel } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ email, firstName, channel });

    return response.json(user);
  }
}

export { CreateUserController };