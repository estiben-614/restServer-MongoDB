import express from "express"
import { Producto } from "../models/producto.js"
const {response}=express

export const crearProducto=async (req,res=response)=>{
    let {nombre,...resto}=req.body

    nombre=nombre.toUpperCase()
    console.log(resto)
    //Buscamos en la BD un producto con nombre, si no hay, devuelve null
    const productoDB= await Producto.findOne({nombre})
  
    //Si da diferente de null, existe
    if(productoDB){
        return res.status(400).json({
            msg:`El producto ${productoDB.nombre} ya existe`
        })
    }
    

    //Generar la data a guardar
    const data={
        nombre,
        usuario:req.usuario._id,// la propiedan req.usuario._id viene del validar JWT que se ejecuta primero 
        precio:resto.precio,
        categoria:resto.categoria
    }
    //Creamos el producto
    const producto=new Producto(data)
    //Guardamos en DB
    await producto.save()

    res.status(201).json(producto)
}

//Muestra todos los productos con estado true
export const obtenerProductos=async (req,res=response)=>{
   
    const [total,productos]=await Promise.all([
        Producto.countDocuments({estado:true}),
        Producto.find({estado:true})
    ])

    res.json({
        total,
        productos
    })
 
}

export const obtenerProductoPorId=async(req,res)=>{

    //Con esto recuperamos el id del query. //Recupera el ID  del producto
    const {id}=req.params
    const _id=id
    //Populate relaciona toda la de la categoria del producto
    const producto= await Producto.findById(_id).populate('categoria')

    if(!producto){
        res.status(401).json({
            msg: `El producto con id: ${_id} no está registrada en la BD`
        })
    }

    res.json({
        producto
    })
}

export const actualizarProducto=async(req,res)=>{
    //Recupera el ID  a actualizar
    const {id}=req.params
   
    //Recupera lo enviado en la request del body
    const nombreProducto=req.body.nombre.toUpperCase()
    const {nombre,...resto}=req.body
    
    const data={
        nombre:nombreProducto,
        estado:resto.estado,
        precio:resto.precio,
        usuario:req.usuario._id, //Recordar que esa info la trae el validarJWT
        disponible:resto.disponible
    }

    const producto=await Producto.findByIdAndUpdate(id,data,{new:true})
    console.log(producto)
    res.json({
        producto
    })


}

export const eliminarProducto=async(req,res)=>{
    //Recupera el ID  a borrar
    const {id}=req.params
    const productoBorrado=await Producto.findByIdAndUpdate(id,{estado:false},{new:true})
    console.log(productoBorrado)
    res.json({
        productoBorrado
    })


}