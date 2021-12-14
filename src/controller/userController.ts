import {Request, Response} from "express";
import {CreateUserServices, GetOneUserServices, GetUsersServices, DeleteUserServices, UpdateUserServices} from "../services/userServices"
import {AppError} from "../errors/AppError"

class CreateUserController {
  async execute(req: Request, res: Response) {
    
    const {name, email, password} = req.body;

    const user = new CreateUserServices();

    const result = await user.service({name, email, password});

    return res.status(201).json(result);
    
  }

}

class GetUsersController {
  async execute(req: Request, res: Response) {
    const user = new GetUsersServices();

    const result = await user.service();

    return res.status(200).json(result);

  }
}

class GetOneUserController {
  async execute(req: Request, res: Response) {
    const {id} = req.params;

    const user = new GetOneUserServices();

    const result = await user.service(id);

    return res.status(200).json(result);
  }
}

class UpdateUserController {
  async execute(req: Request, res: Response) {
    const {name} = req.body;
    const {id} = req.params;

    const user = new UpdateUserServices();

    const result = await user.service(id, name);

    return res.status(200).json(result);

  }
}

class DeleteUserController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;

    const user = new DeleteUserServices();

    const result = await user.service(id)

    return res.status(200).json({message: "successfully deleted"});
  }

}


export {CreateUserController, GetOneUserController, GetUsersController, DeleteUserController, UpdateUserController}