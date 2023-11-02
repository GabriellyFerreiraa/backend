import {Router} from 'express';
import jwt from 'jsonwebtoken'

export class MiRouter{
    constructor(){
        this.router=Router()
        this.init()
    }

    init(){}

    getRouter(){
        return this.router
    }

    get(ruta,permisos,...funciones){
        console.log({ruta, funciones})
        this.router.get(ruta, this.misRespuestas, this.acceso(permisos), funciones)
    }

    post(ruta,permisos,...funciones){
        console.log({ruta, funciones})
        this.router.post(ruta, this.misRespuestas, this.acceso(permisos), funciones)
    }

    put(ruta,permisos,...funciones){
        console.log({ruta, funciones})
        this.router.put(ruta, this.misRespuestas, this.acceso(permisos), funciones)
    }

    delete(ruta,permisos,...funciones){
        console.log({ruta, funciones})
        this.router.delete(ruta, this.misRespuestas, this.acceso(permisos), funciones)
    }
    misRespuestas=(req,res,next)=>{
        res.success=(respuesta)=>res.status(200).json({status:'success', respuesta})
        res.errorCliente=(error)=>res.status(400).json({status:'error cliente', error})
        res.errorAutenticacion=(error)=>res.status(401).json({status:'error autenticacion', error})
        res.errorAutorizacion=(error)=>res.status(403).json({status:'error autorizacion', error})

        next()
    }

    acceso(permisos=['PUBLIC']){
        return (req,res,next)=>{
            if(permisos.includes('PUBLIC')) return next()

            if(!req.cookies.coderCookie) return res.errorAutenticacion('No existe token');
            let token=req.cookies.coderCookie
            jwt.verify(token, "coder123", (err, credencial)=>{
                if(err){
                    return res.errorAutenticacion('Token invalido')
                }else{
                    if(permisos.includes(credencial.usuario.rol.toUpperCase())) return next()
                    else return res.errorAutorizacion('No tiene privilegios suficientes para acceder al recurso')
                }
            })
        }
    }
}