import {Request, Response} from "express";
import {CreateAnimalService, GetOneAnimalService, GetAnimalsService, UpdateAnimalService, DeleteAnimalService} from "../services/animalServices"


class CreateAnimalController {
  async execute(req: Request, res: Response) {
    const {name, species, description, user_id} = req.body;

    const repository = new CreateAnimalService();

    const result = await repository.service({name, species, description, user_id});
    
    return res.status(200).json(result)
  }
}

class GetAnimalsController {
  async execute(req: Request, res: Response) {
    const repository = new GetAnimalsService();
  
    const result = await repository.service();
  
    return res.status(200).json(result);
  
    
  }
}



class UpdateAnimalController {
  async execute(req: Request, res: Response) {
    const {id} = req.params;
    const {name, species, description} = req.body;
  
    const repository = new UpdateAnimalService();
  
    const result = await repository.service(id, name, species, description);
  
    return res.status(200).json(result);
  
  }
}

class DeleteAnimalController{
  async execute(req: Request, res: Response) {
    const {id} = req.params;
  
    const repository = new DeleteAnimalService();
  
    await repository.service(id);
  
    return res.status(200).json({message: "successfully deleted"});
  }
}

class GetOneAnimalController {
  async execute(req: Request, res: Response) {
    const {id} = req.params;
  
    const repository = new GetOneAnimalService();
  
    const result = await repository.service(id);
  
    return res.status(200).json(result);
  }
}


export {CreateAnimalController, GetOneAnimalController, GetAnimalsController, DeleteAnimalController, UpdateAnimalController}