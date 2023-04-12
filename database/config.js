import mongoose from "mongoose"

export const dbConnection=async()=>{
    try{
        //mongoose devuelve una promesa
        //Se pone el await para que espere a que la conexion se realice
        //Si no lo hace, atrapa el error el catch
        await mongoose.connect(process.env.MONGODB_CNN)
        console.log('Base de datos conectada')
    }

    catch(error){
        console.log(error)
        throw new Error('Error al iniciar la BD')
    }
}