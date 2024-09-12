import { connectDB } from "./config/mongoDB.config";
import RabbitMQClient from "./rabbitMQ/client"
import express from "express";
import { Application } from "express";
import "dotenv/config";




class App{
  public app: Application;

  constructor(){
    this.app=express()
    this.app.listen(process.env.AUTHORITY_PORT,()=>{
      console.log(`server  http://localhost:${process.env.AUTHORITY_PORT}`);
      
    })
      connectDB()
      RabbitMQClient.initialize()
  }
}

export default App