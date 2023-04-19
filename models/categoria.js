import  mongoose from "mongoose";

const {Schema, model}=mongoose

const CategoriaSchema=Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        //Relación con el modelo Usuario
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require:true
    }
})

//En este caso, la colección en Mongo tendrá como nombre (roles)
//La funcion model crea una colección con un nombre en plural y en minisculas del ingresado
    
export const Categoria= model('Categoria',CategoriaSchema)
