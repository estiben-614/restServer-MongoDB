import { response,request, json } from "express";
import jwt, { verify } from "jsonwebtoken";
import { Usuario } from "../models/usuario.js";

//Logeamos un usuario y obtenemos su JWT. Ese token lo pegamos en el header x-token de la peticion DELETE 

export const validarJWT=async (req=request,res=response,next)=>{

 //Obtenemos el Token del header x-token establecido en postman     const token=req.header('x-token')
    const token=req.header('x-token')

   //Si no hay un header x-token en la petición
   if(!token){
    return res.status(401).json({
        msg:'No hay un token en la petición'
    })
   }

   //Verificar si el JWT es válido - verify
   try {

    //Verificamos que el token exista en DB y extraemos su uid. Sin destructurar, obtenemos lo mismo, mas fecha de creación y expiracion

    const {uid}= await verify(token,process.env.SECRETORPRIVATEKEY)

    //Obtenemos el usuario al que corresponde ese uid
    const usuario= await Usuario.findById(uid)
        //Verifiquemos si el usuario no existe
        if(!usuario){
            return res.status(401).json({
                msg:'Token no válido - usuario no existe'
            })
        }

    //Verificamos el usuario esté activo

    if(!usuario.estado){
        return res.status(401).json({
            msg:'Token no válido - usuario con estado : false'
        })
    }

    //Guardamos el usuario autenticado en la request
    req.usuario=usuario

    next()
    
   } catch (error) {
    console.log(error)
    res.status(401).json({
        msg:'Token no válido'
    })
   }
   
}
