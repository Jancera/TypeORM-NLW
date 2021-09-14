import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../respositories/UserRepositories";
import {Channel} from "../entities/Channel"
import {validate} from "class-validator";

interface IUserRequest {
  email: string
  firstName: string;
  channel:Channel;
}

class CreateUserService {
  async execute({ email, firstName, channel }: IUserRequest) {
    const userRepository = getCustomRepository(UsersRepositories);

    const user = userRepository.create({
        email, 
        firstName,
        channel
    });

    const errors = await validate(user);
    if (errors.length > 0) {
        console.log(errors);
        throw new Error(`Validation failed!`); 
    } else {
        await userRepository.save(user);
    }
    

    return user;
  }
}

export { CreateUserService };