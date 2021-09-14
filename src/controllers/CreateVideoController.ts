import { Request, Response } from "express";
import { CreateVideoService } from "../services/CreateVideoService";

class CreateVideoController {
  async handle(request: Request, response: Response) {
    const { title, description, channel, tags  } = request.body;

    const createVideoService = new CreateVideoService();

    const video = await createVideoService.execute({ title, description , channel, tags});

    return response.json(video);
  }
}

export { CreateVideoController };