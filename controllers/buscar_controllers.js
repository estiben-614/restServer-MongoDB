import express, { json } from "express"
import mongoose, { isValidObjectId } from "mongoose"
import { Usuario } from "../models/usuario.js"
import { Categoria } from "../models/categoria.js"
import {Producto} from "../models/producto.js"
const {response, request}=express


const coleccionesPermitidas=[
    'usuarios',
    'roles',
    'productos',
    'categorias'

]

export const buscarUsuarios=async(termino='',res=response)=>{
    // Si el termino es un ID, valida que sea un id valido de mongoose 
    //Ejemplo : http://localhost:8080/api/buscar/usuarios/6438212370267c8833af2355
    const esMongoId=mongoose.isValidObjectId(termino)
    if( esMongoId){
        const usuario= await Usuario.findById(termino)
        return res.json({
            //Si usuario existe se manda [usuario] , si no []
            results:(usuario) ? [usuario] :[]
        })
    }

    //Si el termino es un string
    //Ejemplo : http://localhost:8080/api/buscar/usuarios/test20
    
    //Expresión regular :  Crea un patron con el valor ingresado y hace que sea insensible a mayus y minus
    //Si por ejemplo ingreso, http://localhost:8080/api/buscar/usuarios/te , crea el patron /te/i y con
    //Usuario.find buscado TODOS los nombres que empiecen por te
    const regex= new RegExp(termino,'i')
    

    //Busca ya sea por  el correo o el nombre, y que el usuario esté con estado: true
    const usuarios=await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    }
    )
    return res.json({
        results:usuarios
    })
}



export const buscarCategorias=async(termino='',res)=>{
    //Si es ID
    const esMongoId=mongoose.isValidObjectId(termino)

    if(esMongoId){
         const categoria=await Categoria.findById(termino)

         return res.json({
            categoria
         })
    }

    //Si es un string
    const regex= new RegExp(termino,'i')
    const categorias= await Categoria.find({nombre:regex})

    return res.json({
        categorias
    })
}


export const buscarProductos=async(termino='',res)=>{
    //Si es ID
    const esMongoId=mongoose.isValidObjectId(termino)

    if(esMongoId){
         const productos=await Producto.findById(termino).populate('categoria','nombre')

         return res.json({
            productos: productos
         })
    }

    //Si es un string
    const regex= new RegExp(termino,'i')
    const productos= await Producto.find({nombre:regex}).populate('categoria','nombre')

    return res.json({
        productos
    })
}

export const buscar=(req,res=response)=>{
    //Recupera los querys
    //http://localhost:8080/api/buscar/productos/oreo
    const {coleccion,termino}=req.params

    //Si no es una colección permitida
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`${coleccion} no es una colección permitida: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res)
            break;
        case 'categorias':
            buscarCategorias(termino,res)
            break
        case 'productos':
            buscarProductos(termino,res)
        default:
            break;
    }
    
}
