import * as mongoose from "mongoose"
//import mongoose from "mongoose"

//const {Schema,model}=mongoose
//const {Schema,model} =require('mongoose')

const UsuarioSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'El password es obligatorio']
    },
    img:{
        type:String
    },
    role:{
        type:String,
        required:true,
        //Para comparar que el usuario solo sea uno de los siguientes
        //enum:['ADMIN_ROLE','USER_ROLE']
    },

    estado:{
        type: Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default:false
    }



})

//No mostrar el password, __v y unificar los demas en uno
//llamado usuario

UsuarioSchema.methods.toJSON= function(){
    const {__v,password,_id, ...usuario}=this.toObject()
    usuario.uid=_id
    return usuario
}

//En este caso, la colección en Mongo tendrá como nombre (roles)
//La funcion model crea una colección con un nombre en plural y en minisculas del ingresado

export const Usuario=mongoose.model('Usuario',UsuarioSchema)
