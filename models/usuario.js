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

//Recibe el nombre del modelo y un esquema con la data 

//module.exports= model('usuario',UsuarioSchema)

//En este caso, la colección en Mongo tendrá como nombre (roles)
//La funcion model crea una colección con un nombre en plural y en minisculas del ingresado

export const Usuario=mongoose.model('Usuario',UsuarioSchema)

// const Usuario = model('Usuario', usuarioSchema);
// export {
//    Usuario 
// } 


// {
//     "nombre":"test1",
//     "google":true,
//     "nuevoCampo":true,
//     "correo":"test1@test.com",
//     "password":"123456",
//     "role":"USER_ROLE"
    
// }