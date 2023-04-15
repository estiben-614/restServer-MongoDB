import express from "express"
import { Usuario } from "../models/usuario.js"
import  bcrypt from "bcrypt"
import { generarJWT } from "../helpers/generarJWT.js"

const {response,request}=express

export const login=async(req=request,res=response)=>{
    
    const {correo,password}=req.body

    try{

        //verificar si el email existe -- Encuentra al usuario con el correo que se envio en el POST
        const usuario= await Usuario.findOne({correo})
        //console.log(usuario)
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/password incorrecto - correo no existe'
            })
        }

        //Verificar si el usuario está activo
        if(usuario.estado=="false"){
            return res.status(400).json({
                msg:'Usuario/password incorrecto - usuario inactivo'
            })
        }

        //Verificar contraseña --Compara la contraseña del post con el guardado en la DB
        const validPassword= await bcrypt.compareSync(password,usuario.password)
        console.log(validPassword)
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario/password incorrecto - password incorrecto'
            })
        }

        //Generar Token
        const token= await generarJWT(usuario.id)
        console.log(usuario.id)
        console.log({token})

        res.json({
            msg:'login ok',
            usuario,
            token
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msh:'Contactese con el administrador'
        })
    }

}