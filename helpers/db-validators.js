import mongoose from "mongoose"
import { Role } from "../models/role.js"
import { Usuario } from "../models/usuario.js"
import { Categoria } from "../models/categoria.js"
import { Producto } from "../models/producto.js"


export const esRoleValido=async(role='')=> {
    const existeRol= await Role.findOne({role})
    if (!existeRol){
      throw new Error( `El rol ${role} no está registrado en la BD`)
    }
 }

 export const correoValido=async(correo='')=>{
    const existeCorreo= await Usuario.findOne({correo})
    if (existeCorreo){
      throw new Error( `El correo ${correo} ya se encuentra registrado`)
    }
 }

 export const existeUsuarioPorId=async(id)=>{
  const existeUsuario= await Usuario.findById(id)
  console.log(id)

  if (!existeUsuario){
    throw new Error( `El id ${id} no existe`)
  }
}

//Validador de categoria
export const existeCategoriaPorId=async(id)=>{
  const existeCategoria= await Categoria.findById(id)

  if (!existeCategoria){
    throw new Error( `El id ${id} no existe`)
  }
}

//Existe producto 
export const existeProductoPorId=async(id)=>{
  const existeProducto= await Producto.findById(id)

  if (!existeProducto){
    throw new Error( `El id ${id} no existe`)
  }
}

//Validar colecciones permitidas

export const coleccionesPermitidas=(coleccion='',colecciones=[])=>{
  console.log(coleccion)
  const incluida=colecciones.includes(coleccion)

  if(!incluida){
    throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`)
  }

  return true
}