import express from "express"
import { Usuario } from "../models/usuario.js"
import  bcrypt from "bcrypt"
import { generarJWT } from "../helpers/generarJWT.js"
import { googleVerify } from "../helpers/google-verify.js"

const {response,request}=express

export const login=async(req=request,res=response)=>{
    
    const {correo,password}=req.body

    try{

        //verificar si el email existe -- Encuentra al usuario con el correo que se envio en el POST
        let  usuario= await Usuario.findOne({correo})
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
        //console.log(validPassword)
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario/password incorrecto - password incorrecto'
            })
        }

        //Generar Token JWT
        const token= await generarJWT(usuario.id)
        // console.log(usuario.id)
        // console.log({token})

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

//GoogleSignIn y la info del token
export const googleSigIn=async(req=request,res=response)=>{
    const {id_token}=req.body
    console.log(id_token)
    //id_token contiene toda la info del usuario 
    try {
        const {nombre,correo,imagen}=await googleVerify(id_token)
        //Verifica en DB si hay un usuario con el correo de google
        let  usuario= await  Usuario.findOne({correo})
        
        
        //Si no existe ese correo
        if(!usuario){
            //Lo creamos

            const data={
                nombre,
                correo,
                password:':p',
                google:true,
                role:'USER_ROLE',
                imagen
            }
            //Lo creamos
            usuario=new Usuario(data)
            //lo guardamos
            await usuario.save()
            console.log(`Usuario ${usuario.nombre} creado`)
        }
    
        //Si existe, validar que su estado sea diferente a false
        if(usuario.estado==false){
            return res.status(401).json({
                msg:'Hable con el administrador,usuario bloqueado'
            })
        }

        //Generar Token JWT
        const token= await generarJWT(usuario.id)
        res.json({
            usuario,
                token
        })
    } 
    catch (error) {
        console.log(error)
             return res.status(400).json({
                msg:'El token no se puede validar'
            })
    }
    
}