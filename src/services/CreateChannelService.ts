import { getCustomRepository } from "typeorm";
import { ChannelRepositories } from "../respositories/ChannelRepositories";
import {validate} from "class-validator";
import { User } from "../entities/User";
import { Video } from "../entities/Video";

interface IChannelRequest {
  name: string;
  user: User;
  videos: Video[];
}

class CreateChannelService {
  async execute({ name, user, videos }: IChannelRequest) {
    const channelRepository = getCustomRepository(ChannelRepositories);

    const channel = channelRepository.create({
        name, user, videos
    });

    const errors = await validate(channel);
    if (errors.length > 0) {
        console.log(errors);
        throw new Error(`Validation failed!`); 
    } else {
        await channelRepository.save(channel);
    }
    

    return channel;
  }
}

export { CreateChannelService };