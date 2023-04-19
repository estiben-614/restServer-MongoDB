import express from "express"
import { buscar } from "../controllers/buscar_controllers.js"


export const routerBuscar=express.Router()

routerBuscar.get('/:coleccion/:termino',buscar)