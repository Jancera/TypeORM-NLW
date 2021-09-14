import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateChannelController } from "./controllers/CreateChannelController";
import { CreateVideoController } from "./controllers/CreateVideoController";

import { getRepository } from "typeorm";
import { Request, Response } from "express";

import { Tag } from "./entities/Tag";
import { User } from "./entities/User";
import { Channel } from "./entities/Channel";
import { Video } from "./entities/Video";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createChannelController = new CreateChannelController();
const createVideoController = new CreateVideoController();

router.post("/tags", createTagController.handle);
router.post("/users", createUserController.handle);
router.post("/channels", createChannelController.handle);
router.post("/videos", createVideoController.handle);

router.get("/tags", async (request: Request, response: Response) =>{
    response.json(await getRepository(Tag).find());
});
router.get("/users", async (request: Request, response: Response) =>{
    response.json(await getRepository(User).find());
});
router.get("/channels", async (request: Request, response: Response) =>{
    response.json(await getRepository(Channel).find());
});
router.get("/videos", async (request: Request, response: Response) =>{
    response.json(await getRepository(Video).find({relations:["tags"]}));
});

export { router };