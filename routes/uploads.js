import express from "express"
import {body, param} from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js"
import { actualizarImagen, cargarArchivo } from "../controllers/upload.controllers.js"
import { coleccionesPermitidas } from "../helpers/db-validators.js"

export const routerUploads=express.Router()

routerUploads.post('/',cargarArchivo)
//Ejemplo de envio de peticion : http://localhost:8080/api/uploads/usuarios/6438212370267c8833af2355    --Colección trae el valor recuperado del link, es decir,usuarios
routerUploads.put('/:coleccion/:id',[param('id','El id debe ser de mongo').isMongoId(),
                                    param('coleccion','La colección no es permitida').custom(coleccion=>coleccionesPermitidas(coleccion,['usuarios','productos']))
                                    ,validarCampos],actualizarImagen)