import express, {Request, Response, NextFunction}from "express";
import "express-async-errors";
import "reflect-metadata";
import "./database";
import {userRoutes} from "./routes/userRoutes"
import {animalRoutes } from "./routes/AnimalRoutes";
import {AppError} from "./errors/AppError"
const cors = require('cors');


const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use(cors())

app.listen(3000, () => console.log("Server is running"))

app.use(animalRoutes)
app.use(userRoutes)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

  if(err instanceof AppError) {
    return res.status(err.status).json({error: err.message})
  }
  
  return res.status(500).json({status: "Internal server error"})

})