import { EntityRepository, Repository } from "typeorm";
import { Channel } from "../entities/Channel";

@EntityRepository(Channel)
class ChannelRepositories extends Repository<Channel> {}

export { ChannelRepositories };