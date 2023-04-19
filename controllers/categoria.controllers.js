import express from "express"
import { Categoria } from "../models/categoria.js"
const {response}=express

export const crearCategoria=async (req,res=response)=>{
    const nombre=req.body.nombre.toUpperCase()

    //Buscamos en la BD una categoria con nombre, si no hay, devuelve null
    const categoriaDB= await Categoria.findOne({nombre})

    //Si da diferente de null, existe
    if(categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${categoriaDB} ya existe`
        })
    }

    //Generar la data a guardar
    const data={
        nombre,
        usuario:req.usuario._id // la propiedan req.usuario._id viene del validar JWT que se ejecuta primero 
    }
    //Creamos la categoria
    const categoria=new Categoria(data)

    //Guardamos en DB
    await categoria.save()

    res.status(201).json(categoria)
}

export const obtenerCategorias=async (req,res=response)=>{
   
    const [total,categorias]=await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true})
    ])

    res.json({
        total,
        categorias
    })
 
}

export const obtenerCategoriaPorId=async(req,res)=>{

    //Con esto recuperamos el id del query. //Recupera el ID  de la categoria
    const {id}=req.params
    const _id=id
    //Populate relaciona toda la info del ID que generó el catalogo
    const categoria= await Categoria.findById(_id).populate('usuario','nombre')

    if(!categoria){
        res.status(401).json({
            msg: `La categoria con id: ${_id} no está registrada en la BD`
        })
    }

    res.json({
        categoria
    })
}

export const actualizarCategoria=async(req,res)=>{
    //Recupera el ID  a actualizar
    const {id}=req.params
   
    //Recupera lo enviado en la request del body
    const nombreCategoria=req.body.nombre.toUpperCase()
    const {nombre,...resto}=req.body
    
    const data={
        nombre:nombreCategoria,
        estado:resto.estado,
        usuario:req.usuario._id //Recordar que esa info la trae el validarJWT
    }

    const categoria=await Categoria.findByIdAndUpdate(id,data,{new:true})
    console.log(categoria)
    res.json({
        categoria
    })


}

export const eliminarCategoria=async(req,res)=>{
    //Recupera el ID  a borrar
    const {id}=req.params
    const categoriEliminada=await Categoria.findByIdAndUpdate(id,{estado:false},{new:true})
    console.log(categoriEliminada)
    res.json({
        categoriEliminada
    })


}