import { EntityRepository, Repository } from "typeorm";
import { Video } from "../entities/Video";

@EntityRepository(Video)
class VideoRepositories extends Repository<Video> {}

export { VideoRepositories };