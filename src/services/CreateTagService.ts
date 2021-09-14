import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../respositories/TagRepositories";
import {validate} from "class-validator";

interface ITagRequest {
  name: string;
}

class CreateTagService {
  async execute({ name }: ITagRequest) {
    const tagRepository = getCustomRepository(TagRepositories);

    const tag = tagRepository.create({
       name
    });

    const errors = await validate(tag);
    if (errors.length > 0) {
        console.log(errors);
        throw new Error(`Validation failed!`); 
    } else {
        await tagRepository.save(tag);
    }
    

    return tag;
  }
}

export { CreateTagService };