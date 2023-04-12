import express from "express"
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from "../controllers/user.controlers.js"

import { body,validationResult } from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js"
export const router=express.Router()


// import { Router } from "express"

// export const router=Router()
router.get('/', usuariosGet)

  router.put('/:id',usuariosPut)
  //Si el nombre está vacio o el correo no tiene formato email se lanzan esas alertas
  router.post('/',[body('correo','El correo no es válido').isEmail(),
                   body('nombre','El nombre es obligatorio').not().isEmpty(),
                   body('password','La contraseña es obligatoria y debe ser mayor a 6 letras').isLength({min:6}).not().isEmpty(),
                   body('role','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
                  validarCampos],
                  usuariosPost)

  router.delete('/', usuariosDelete)