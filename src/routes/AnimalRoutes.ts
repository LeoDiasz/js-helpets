import {Router} from "express";
import {CreateAnimalController, GetOneAnimalController, GetAnimalsController, UpdateAnimalController, DeleteAnimalController} from "../controller/animalController";


const animalRoutes = Router()

animalRoutes.post("/animal", new CreateAnimalController().execute)
animalRoutes.get("/animal", new GetAnimalsController().execute)
animalRoutes.get("/animal/:id", new GetOneAnimalController().execute)
animalRoutes.put("/animal/:id", new UpdateAnimalController().execute)
animalRoutes.delete("/animal/:id", new DeleteAnimalController().execute)

export {animalRoutes}