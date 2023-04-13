import mongoose from "mongoose"
import { Role } from "../models/role.js"
import { Usuario } from "../models/usuario.js"


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