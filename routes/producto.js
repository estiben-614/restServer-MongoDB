import express from "express"
import {body, param} from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js"
import { validarJWT } from "../middlewares/validarJWT.js"

import { tieneRol } from "../middlewares/validar_rol.js"
import { existeProductoPorId,existeCategoriaPorId } from "../helpers/db-validators.js"
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProductoPorId, obtenerProductos } from "../controllers/producto.controllers.js"


export const routerProductos=express.Router()

//Crear productos - privado : Cualquier persona con un
//token válido ( debe autenticarse con validarJWT)
routerProductos.post('/',[validarJWT,body('nombre','El nombre es obligatorio').not().isEmpty(),
                                        body('categoria').isMongoId().custom(existeCategoriaPorId),validarCampos],crearProducto)

//Obtener productos - público - paginado
routerProductos.get('/',obtenerProductos)

//Obtener productos por ID - público 
routerProductos.get('/:id',[param('id','No es un ID válido ').isMongoId().custom(existeProductoPorId),
validarCampos],obtenerProductoPorId)

//Actualizar un producto por ID - público 
routerProductos.put('/:id',[validarJWT,param('id','No es un ID válido ').isMongoId().custom(existeProductoPorId),
validarCampos],actualizarProducto)

//Borrar un producto -Solo ADMIN_ROLE
routerProductos.delete('/:id',[validarJWT,param('id','No es un ID válido ').isMongoId().custom(existeProductoPorId), tieneRol('ADMIN_ROLE'),
validarCampos],eliminarProducto)

