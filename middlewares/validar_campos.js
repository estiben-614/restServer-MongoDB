import  express  from "express";
import { validationResult } from "express-validator";
import {response,request} from "express"


export const validarCampos=(req=request,res=response,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next()
}
 

