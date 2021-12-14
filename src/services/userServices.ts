import {UsersRepositories} from "../repositories/userRepositories";
import {getCustomRepository} from "typeorm";
import {AppError} from "../errors/AppError"

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}



class CreateUserServices {
  async service({name, email, password}: IUserRequest) {
    const userRepository = getCustomRepository(UsersRepositories)

    if(!email || !password ) {
      throw new AppError("email or password not filled in")
    }
    
    if(await userRepository.findOne({email})) {
      throw new AppError("User already exists")
    }

    const user = userRepository.create({name, email, password})

    await userRepository.save(user)

    return user
  }
}

class GetUsersServices {
  async service(){
    const userRepository = getCustomRepository(UsersRepositories);

    const result = await userRepository.find();

    if (!result) {
      throw new AppError("not to users");
    }
    
    return result 

  }
}

class DeleteUserServices {
  async service(id: string) {
    const userRepository = getCustomRepository(UsersRepositories)


    if (!await userRepository.findOne(id)) {
      throw new AppError("there is no such user")
    }
  
   const user = await userRepository.delete(id)
  }
}

class UpdateUserServices {
  async service(id: string, name: string) {
    const userRepository = getCustomRepository(UsersRepositories)
    
    const user = await userRepository.findOne(id)

    if(!user) {
      throw new AppError("there is no such user")
    }

    if (!name) {
      throw new AppError("name not completed")
    }

    user.name = name

    await userRepository.save(user)

    return user
    
  }

}

class GetOneUserServices {
  async service(id: string) {
    const userRepository = getCustomRepository(UsersRepositories);

    const user = await userRepository.findOne(id);

    if(!user) {
      throw new AppError("there is no such user")
    }

    return user

  }
}

export {CreateUserServices, GetOneUserServices, GetUsersServices, DeleteUserServices, UpdateUserServices}