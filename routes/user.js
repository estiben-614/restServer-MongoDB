import express from "express"
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from "../controllers/user.controlers.js"
import { body,param } from "express-validator"
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
                   body('role').custom(esRoleValido),
                  validarCampos],
                  usuariosPost)

  router.delete('/:id',[param('id','No es un ID válido ').isMongoId().custom(existeUsuarioPorId),
  validarCampos], usuariosDelete)