import express from "express"
import { googleSigIn, login } from "../controllers/auth.controllers.js"
import {body} from "express-validator"
import { validarCampos } from "../middlewares/validar_campos.js"

export const routerAuth=express.Router()

routerAuth.post('/login',[body('correo','No es un email válido').isEmail(),
                body('password','El password debe contener almenos 6 caracteres').not().isEmpty().isLength({min:6}),validarCampos],login)

routerAuth.post('/google',[body('id_token','id_token es necesario').not().isEmpty()
               ,validarCampos],googleSigIn)