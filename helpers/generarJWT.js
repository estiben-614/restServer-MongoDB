import jsonwebtoken from "jsonwebtoken"

export const generarJWT=(uid='')=>{
    return new Promise((resolve, reject)=>{

        //En el token grabamos el uid del usuario
        const payload={uid}
        jsonwebtoken.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'4h'
        }, (err,token)=>{
            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }
            else{
                resolve(token)
            }
        }
    )})
}
