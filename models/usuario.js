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
        enum:['ADMIN_ROLE','USER_ROLE']
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
export const Usuario=mongoose.model('Usuarios',UsuarioSchema)

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