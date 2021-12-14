import {Router} from "express";
import {CreateUserController, GetOneUserController, GetUsersController, DeleteUserController, UpdateUserController} from "../controller/userController";


const userRoutes = Router()

userRoutes.post("/user", new CreateUserController().execute)
userRoutes.get("/user", new GetUsersController().execute)
userRoutes.get("/user/:id", new GetOneUserController().execute)
userRoutes.put("/user/:id", new UpdateUserController().execute)
userRoutes.delete("/user/:id", new DeleteUserController().execute)

export {userRoutes}