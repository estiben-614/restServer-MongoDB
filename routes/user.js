import express from "express"
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from "../controllers/user.controlers.js"
import { body,param } from "express-validator"

//Middlewares
import { validarJWT } from "../middlewares/validarJWT.js"
import { esAdminRole, tieneRol } from "../middlewares/validar_rol.js"
import { validarCampos } from "../middlewares/validar_campos.js"

import { correoValido, esRoleValido, existeUsuarioPorId } from "../helpers/db-validators.js"


export const router=express.Router()



router.get('/', usuariosGet)

  router.put('/:id',[param('id','No es un ID válido ').isMongoId().custom(existeUsuarioPorId),
            validarCampos],usuariosPut)
  //Si el nombre está vacio o el correo no tiene formato email se lanzan esas alertas
  router.post('/',[body('correo','El correo no es válido').isEmail().custom(correoValido),
                  body('nombre','El nombre es obligatorio').not().isEmpty(),
                   body('password','La contraseña es obligatoria y debe ser mayor a 6 letras').isLength({min:6}).not().isEmpty(),
                   body('role').custom((role)=>esRoleValido(role)),
                  validarCampos],
                  usuariosPost)

  //DELETE ES LA UNICA PETICION QUE NECESITA SER AUTENTICADA (validarJWT)
  //Se ejecutan en orden, por eso primero se valida el JWT, si no pasa la validación, no sigue
  router.delete('/:id',[validarJWT,
                        //esAdminRole,
                        tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
                        param('id','No es un ID válido ').isMongoId().custom(existeUsuarioPorId),
  validarCampos], usuariosDelete)