import { getCustomRepository } from "typeorm";
import { VideoRepositories } from "../respositories/VideoRepositories";
import { TagRepositories } from "../respositories/TagRepositories";
import {validate} from "class-validator";
import { Channel } from "../entities/Channel";
import { Tag } from "../entities/Tag";

interface IVideoRequest {
  title: string;
  description: string;
  channel: Channel;
  tags:Tag[];
}

class CreateVideoService {
  async execute({ title, description, channel,tags }: IVideoRequest) {
    const videoRepository = getCustomRepository(VideoRepositories);

    const video = videoRepository.create({
        title, description , channel, tags
    });

    const errors = await validate(video);
    if (errors.length > 0) {
        console.log(errors);
        throw new Error(`Validation failed!`); 
    } else {
        await videoRepository.save(video);
    }
    

    return video;
  }
}

export { CreateVideoService };