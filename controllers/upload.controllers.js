import express from 'express';
import { subirArchivo } from '../helpers/subir-archivo.js';
import { Usuario } from '../models/usuario.js';
import { Producto } from '../models/producto.js';
import { model } from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, unlinkSync } from 'fs';

import cloudinary from "cloudinary"
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const {response}=express

//Para usar cloudinary
// Configuration 
cloudinary.config({
    cloud_name: "dchsppc30",
    api_key: "536174639121937",
    api_secret: "aVgRqynEU7tHnpIf_eIW3syJ6sk"
  });
//cloudinary.config(process.env.CLOUDINARY_URL)

export const cargarArchivo=async(req,res=response)=>{

    
  
    //archivo es el nombre (key) con el que subimos el archivo en postman 
    //Para verificar que si hay un archivo para subir
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'No hay archivos que subir o no viene el archivo'});
       
      }
   
    try {
        //Si no se ponen extensiones, por default pondrá extensionesValidas=['png','jpg','jpeg','gif']
        const nombre=await subirArchivo(req.files,undefined,'img')
        res.json({
            nombre
        })

    } catch (error) {
        res.json({
            msg:error
        })
    }
}

export const actualizarImagen=async(req,res=response)=>{

     //Para verificar que si hay un archivo para subir
     if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'No hay archivos que subir o no viene el archivo'});
        
      }

    //Recupera los parametros de http://localhost:8080/api/uploads/usuarios/6438212370267c8833af2355
    const {id,coleccion}=req.params


    let modelo

    switch (coleccion) {
        case 'usuarios':
            //Si existe me trae la info de ese usuario 
            modelo= await Usuario.findById(id)

            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                })
            }
            
            break;

        case 'productos':
            //Si existe me trae la info de ese producto 
                modelo= await Producto.findById(id)
    
                if(!modelo){
                    return res.status(400).json({
                        msg:`No existe un producto con el id ${id}`
                    })
                }
                
                break;
    
        default:
            break;
    }
    //Limpiar imagenes previas
    //Verifica si ya hay una imagen en el usuario/producto
    if(modelo.img){
        //Hay que borrar esa imagen para que se actualice la nueva, para eso obtenemos la ruta de la imagen que existe
        const pathImagen=path.join(__dirname,'../uploads/',coleccion,modelo.img)
        console.log(pathImagen)
        //Revisemos si existe un archivo con esa ruta
        if(existsSync(pathImagen)){
            //Si existe, lo borramos
            unlinkSync(pathImagen)
        }

        //Seguimos para guardar la imagen nueva en DB
    }
    //Recordar que req.files es el archivo que estamos subiendo, undefined son las extensiones por default y coleccion el nombre de la carpeta donde
    //se van a guardar las imagenes
    const imagen=await subirArchivo(req.files,undefined,coleccion)

    //Tanto producto como usuario tienen la propiedad img
    //Recordar que modelo recupera el usuario o producto que existe con ese ID
    modelo.img=imagen

    await modelo.save()
    res.json(modelo)
}

export const mostrarImagen=async(req,res=response)=>{

    //Recupera los parametros de http://localhost:8080/api/uploads/usuarios/6438212370267c8833af2355
    const {id,coleccion}=req.params


    let modelo

    switch (coleccion) {
        case 'usuarios':
            //Si existe me trae la info de ese usuario 
            modelo= await Usuario.findById(id)

            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                })
            }
            
            break;

        case 'productos':
            //Si existe me trae la info de ese producto 
                modelo= await Producto.findById(id)
    
                if(!modelo){
                    return res.status(400).json({
                        msg:`No existe un producto con el id ${id}`
                    })
                }
                
                break;
    
        default:
            break;
    }
    //Limpiar imagenes previas
    //Verifica si ya hay una imagen en el usuario/producto
    if(modelo.img){
        //Hay que borrar esa imagen para que se actualice la nueva, para eso obtenemos la ruta de la imagen que existe
        const pathImagen=path.join(__dirname,'../uploads/',coleccion,modelo.img)
        console.log(pathImagen)
        //Revisemos si existe un archivo con esa ruta
        if(existsSync(pathImagen)){
            
            //TODO 
            //A diferencia del anterior, este devuelve /muestra la imagen con ese ID
            res.sendFile(pathImagen)
        }

        

        
    }
    //En caso de que no existe una imagen con ese ID 
    res.sendFile(path.join(__dirname,'../assets/no-image.jpg'))
  
}

//TODO HACE SIRVE PARA SUBIR/ACTUALIZAR EL ARCHIVO, PERO SE GUARDA EN EL SERVER CLOUDINARY
export const actualizarImagenCloudinary=async(req,res=response)=>{

    //Para verificar que si hay un archivo para subir
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
       return res.status(400).json({msg:'No hay archivos que subir o no viene el archivo'});
       
     }

   //Recupera los parametros de http://localhost:8080/api/uploads/usuarios/6438212370267c8833af2355
   const {id,coleccion}=req.params


   let modelo

   switch (coleccion) {
       case 'usuarios':
           //Si existe me trae la info de ese usuario 
           modelo= await Usuario.findById(id)

           if(!modelo){
               return res.status(400).json({
                   msg:`No existe un usuario con el id ${id}`
               })
           }
           
           break;

       case 'productos':
           //Si existe me trae la info de ese producto 
               modelo= await Producto.findById(id)
   
               if(!modelo){
                   return res.status(400).json({
                       msg:`No existe un producto con el id ${id}`
                   })
               }
               
               break;
   
       default:
           break;
   }
   
   //Si ya hay una imagen 
   if(modelo.img){
    //Para actualizar necesitamos el identificador de la imagen. Es el que está antes de .jpg
    //https://res.cloudinary.com/dchsppc30/image/upload/v1682311001/qkf0jyhlhzzyoxtwnbhf.jpg
    const nombreArr=modelo.img.split('/')

    //El ultimo elemento del arreglo
    const nombre=nombreArr[nombreArr.length-1]

    //Obtenemos ese ID
    const [public_id]=nombre.split('')
    
    //Borramos la anterior 
    cloudinary.uploader.destroy(publicDecrypt)
   
    
    //TODO luego de este condificional, sube la nueva imagen
   }
   //Me da la ruta del archivo que enviamos por POSTMAN y es lo que enviamos al servidor
   //req.files.archivo contiene esa info
   const {tempFilePath}=req.files.archivo

   // resp me trae toda la información de la subida  a la plataforma
   //Me trae el secure_url que es el url ya en cloudinary
   //const resp=await cloudinary.uploader.upload(tempFilePath)
   
   const {secure_url}=await cloudinary.uploader.upload(tempFilePath)
   modelo.img=secure_url
   await modelo.save()
   res.json(modelo)
}




