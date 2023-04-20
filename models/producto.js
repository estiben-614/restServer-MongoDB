import  mongoose from "mongoose";

const {Schema, model}=mongoose

const ProductoSchema=Schema({
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
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        //Relación con el modelo Categoria
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        require:true
    },
    descripción:{ type:String},
    disponible:{type:Boolean,default:true},
    img:{type:String}
})

//En este caso, la colección en Mongo tendrá como nombre (productos)
//La funcion model crea una colección con un nombre en plural y en minisculas del ingresado
    
export const Producto= model('Producto',ProductoSchema)
