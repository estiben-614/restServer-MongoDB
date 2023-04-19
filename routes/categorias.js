import express from "express"
import {body, param} from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js"
import { validarJWT } from "../middlewares/validarJWT.js"
import { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategoriaPorId, obtenerCategorias } from "../controllers/categoria.controllers.js"
import { existeCategoriaPorId } from "../helpers/db-validators.js"
import { tieneRol } from "../middlewares/validar_rol.js"

export const routerCategorias=express.Router()

//Crear categoria - privado : Cualquier persona con un
//token válido ( debe autenticarse con validarJWT)
routerCategorias.post('/',[validarJWT,body('nombre','El nombre es obligatorio').not().isEmpty(),validarCampos],crearCategoria)

//Obtener categorias - público - paginado
routerCategorias.get('/',obtenerCategorias)

//Obtener categorias por ID - público 
routerCategorias.get('/:id',[param('id','No es un ID válido ').isMongoId().custom(existeCategoriaPorId),
validarCampos],obtenerCategoriaPorId)

//Actualizar una categoria por ID - público 
routerCategorias.put('/:id',[validarJWT,param('id','No es un ID válido ').isMongoId().custom(existeCategoriaPorId),
validarCampos],actualizarCategoria)

//Borrar una categoria -Solo ADMIN_ROLE
routerCategorias.delete('/:id',[validarJWT,param('id','No es un ID válido ').isMongoId().custom(existeCategoriaPorId), tieneRol('ADMIN_ROLE'),
validarCampos],eliminarCategoria)