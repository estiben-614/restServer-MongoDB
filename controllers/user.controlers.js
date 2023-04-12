import { request, response } from "express"
import { Usuario } from "../models/usuario.js"
import  bcrypt from "bcrypt"
import { validationResult } from "express-validator"

//const{ response}=requiere('express')

//const Usuario=require("../models/usuario.js")
 
export const usuariosGet=(req=request, res=response) => {
    //http://localhost:8080/api/usuarios?q=Hola&Nombre=Estiben&Ocupacion=Estudiante
    const {q,Nombre,Ocupacion,page='1-default'}=req.query
    res.json({
        ok:true,
        msg:'get API- Controlador',
        q,
        Nombre,
        Ocupacion,
        page
    })
}

export const usuariosPut=(req, res=response) => {

    const {id}=req.params
    res.status(400).json({
        ok:true,
        msg:'put API- Controlador',
        id
    })
  }

export const usuariosPost=async (req, res=response) => {

    //Error al validar si es un email
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    //Me recibe la info del post
    
    //const body=req.body
    //const usuario=new Usuario(body)

    const {nombre,correo,password,role}=req.body
    //Se exporta la data del body a la BD
    //{nombre,correo...}Debido a que se envia es un objeto, no es desestructuracion
    //usuario es un objeto
    const usuario=new Usuario({nombre,correo,password,role})

    
    //Verificar si el email existe --> Recordar que Usuario es la info cargada a la BD
    const emailexist=await Usuario.findOne({correo})
        //Si el email ya existe
    if(emailexist){
        return res.status(400).json({
            msg:'El email ya fue registrado'
        })
    }

    //Encriptar la contraseña
    const salt=bcrypt.genSaltSync()
        //La encriptacion se guarda en el password del usuario
    usuario.password=bcrypt.hashSync(password,salt)

    //Guarda la data en la DB
    await usuario.save()

    //const {nombre,edad}=req.body
    res.status(200).json({
        ok:true,
        msg:'post API- Controlador',
        //body
        //nombre,
        usuario
    })
  }

  export const usuariosDelete=(req, res=response) => {
    res.status(400).json({
        ok:true,
        msg:'delete API- Controlador'
    })
  }