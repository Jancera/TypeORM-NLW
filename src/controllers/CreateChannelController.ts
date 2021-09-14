import { Request, Response } from "express";
import { CreateChannelService } from "../services/CreateChannelService";

class CreateChannelController {
  async handle(request: Request, response: Response) {
    const { name, user, videos } = request.body;

    const createChannelService = new CreateChannelService();

    const channel = await createChannelService.execute({ name, user, videos});

    return response.json(channel);
  }
}

export { CreateChannelController };