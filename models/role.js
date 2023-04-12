import  mongoose from "mongoose";

const {Schema, model}=mongoose

const RoleSchema=Schema({
    role:{
        type:String,
        required:[true,'El rol es obligatorio']
    }
})

//En este caso, la colección en Mongo tendrá como nombre (roles)
//La funcion model crea una colección con un nombre en plural y en minisculas del ingresado
    
export const Role= model('Role',RoleSchema)

