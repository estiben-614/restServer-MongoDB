import { request, response } from "express"
import { Usuario } from "../models/usuario.js"
import  bcrypt from "bcrypt"
import { validationResult } from "express-validator"

 
export const usuariosGet=async(req=request, res=response) => {
    
    //http://localhost:8080/api/usuarios?desde=2&limite=3
    //Si no introduce un query de limite, solo se mostraran 2
    const {limite=2,desde}=req.query

    //Se puede ejecutar cada una con su await, pero pueden chocar las promesas
    //Con esto se ejecutan a la vez
    const [total,Usuarios]=await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .limit(Number(limite))
        .skip(Number(desde))

    ])
    res.json({total,Usuarios})
}

export const usuariosPut=async(req, res=response) => {

    const {id}=req.params
    const {password,google,correo,...resto}=req.body

    //Validar contra BD
    if(password){
         //Encriptar la contraseña
    const salt=bcrypt.genSaltSync()
    //La encriptacion se guarda en el password del usuario
    resto.password=bcrypt.hashSync(password,salt)
    }
    
    //Busquelo por el id y actualicelo por lo que hay en resto 
    const usuario= await Usuario.findByIdAndUpdate(id,resto)
    res.status(400).json({
        ok:true,
        msg:'put API- Controlador',
        //id
        usuario
    })
  }

export const usuariosPost=async (req, res=response) => {

   

    //Me recibe la info del post
    
    //const body=req.body
    //const usuario=new Usuario(body)

    const {nombre,correo,password,role}=req.body
    
    //Se exporta la data del body a la BD
    //Recordar que nombre,correo, etc se introducen en el POST
    const usuario=new Usuario({nombre,correo,password,role})

    const salt=bcrypt.genSaltSync()
    usuario.password=bcrypt.hashSync(password,salt)

    //Guarda la data en la DB
    const datosGuardados=await usuario.save()
    //Mostrar el ID de la BD en usuario
    const id_user=datosGuardados._id
    
    res.status(200).json({
        ok:true,
        msg:'post API- Controlador',
        usuario,
        id_user
        
    })
  }

  export const usuariosDelete=async(req, res=response) => {

    //Obtiene el id del query
    const {id}=req.params

    //Borrar fisicamente
    //const usuario=await Usuario.findByIdAndDelete(id)
    
    //Borrar cambiando de estado
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false})
    res.status(400).json({
        ok:true,
        msg:'delete API- Controlador',
        usuario
    })
  }