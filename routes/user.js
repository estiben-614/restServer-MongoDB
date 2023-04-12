import express from "express"
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from "../controllers/user.controlers.js"

import { body,validationResult } from "express-validator"
export const router=express.Router()


// import { Router } from "express"

// export const router=Router()
router.get('/', usuariosGet)

  router.put('/:id',usuariosPut)
  
  router.post('/',[body('correo').isEmail()],usuariosPost)

  router.delete('/', usuariosDelete)