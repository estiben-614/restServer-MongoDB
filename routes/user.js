import express from "express"
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from "../controllers/user.controlers.js"

export const router=express.Router()


// import { Router } from "express"

// export const router=Router()
router.get('/', usuariosGet)

  router.put('/:id',usuariosPut)
  
  router.post('/',usuariosPost)

  router.delete('/', usuariosDelete)