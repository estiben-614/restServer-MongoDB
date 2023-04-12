import express from "express";
import cors from "cors"

import { router } from "../routes/user.js   ";
import { dbConnection } from "../database/config.js";

export class Server{
    constructor(){
        //Cada vez que se crea una clase server se ejecutan estas variables
        this.app= express()
        this.port = process.env.PORT

        //Conectar  ala base de datos
        this.conectarDB()

        this.usuariosPath='/api/usuarios'

        //Middlewares : Funciones que se van a levantar cuando se ejecute el servidor 
        this.middelwares()
        
        //Rutas de aplicación
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }
    middelwares(){
        //CORS
        this.app.use(cors())

        //Lectura y parseo del body, recibe la info de los post,put, etc
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath,router)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
    }
}