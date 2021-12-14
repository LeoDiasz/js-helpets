import {AnimalRepositories} from "../repositories/animalRepositories";
import {getCustomRepository, getRepository} from "typeorm";
import {AppError} from "../errors/AppError"
import {UsersRepositories} from "../repositories/userRepositories"
import {Animal} from "../entities/Animal"

interface IAnimalRequest {
  name: string;
  species: string;
  description: string;
  user_id: string
};

class CreateAnimalService {
  async service({name, species, description, user_id}: IAnimalRequest) {
    const AnimalRepository = getRepository(Animal)
    const userRepository = getCustomRepository(UsersRepositories)

    console.log(user_id, name, species, description)
    if(!await userRepository.findOne(user_id)){
      throw new AppError("need a user to register")
    }

    if(!name || !species || !description) {
      throw new AppError("Enter all required parameters")
    }

   
    
    const animal = AnimalRepository.create({name, species, description, user_id})

    await AnimalRepository.save(animal)

    return animal

  }
}

class GetAnimalsService {
  async service(){
    const AnimalRepository = getCustomRepository(AnimalRepositories);

    const result = await AnimalRepository.find()
    
    if (!result) {
      throw new AppError("not to animals")
    }
    
    return result 

  }
}

class UpdateAnimalService {
  async service(id: string, name: string, species: string, description: string) {
    const AnimalRepository = getCustomRepository(AnimalRepositories)
    
    const animal = await AnimalRepository.findOne(id)

    if(!animal) {
      throw new AppError("there is no such animal")
    }

    if (name) {
      animal.name = name
    }
    if (species) {
      animal.species = species
    }
    if (description) {
      animal.description = description
    }

    await AnimalRepository.save(animal)

    return animal
    
  }

}

class GetOneAnimalService {
  async service(id: string) {
    const AnimalRepository = getCustomRepository(AnimalRepositories);

    const result = await AnimalRepository.findOne(id);

    if(!result) {
      throw new AppError("there is no such animal")
    }

    return result

  }
}

class DeleteAnimalService {
  async service(id: string) {
    const AnimalRepository = getCustomRepository(AnimalRepositories)
    
    if(!await AnimalRepository.findOne(id)) {
      throw new AppError("there is no such animal")
    }
    
    const Animal = await AnimalRepository.delete(id)
}

}

export {CreateAnimalService, GetOneAnimalService, GetAnimalsService, UpdateAnimalService, DeleteAnimalService}