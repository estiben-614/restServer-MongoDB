import { response,request, json } from "express";



export const esAdminRole=(req=request,res=response,next)=>{

        //Se consigue esta info gracias a validarJWT que se ejecuta primero
        const {nombre,role}=req.usuario

        if(role !=='ADMIN_ROLE'){
            return res.status(401).json({
                msg:`El usuario ${nombre} no es ADMIN_ROLE`
            })
        }

        next()
}

//...roles guarda en un arreglo todos los parametros que introduzcan
export const tieneRol=(...roles)=>{

    return (req=request,res=response,next)=>{
        //console.log(roles,req.usuario.role)
                //Se consigue esta info de req.usuario.role gracias a validarJWT que se ejecuta primero

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg:`El usuario ${req.usuario.nombre} no es ninguno de los siguientes roles ${roles}`
            })
        }
        next()

    }


    
}