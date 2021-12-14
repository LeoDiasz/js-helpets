import { EntityRepository, Repository} from "typeorm";
import {Animal} from "../entities/Animal"

@EntityRepository(Animal)
class AnimalRepositories extends Repository <Animal> {
  
}

export {AnimalRepositories}