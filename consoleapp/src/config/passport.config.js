import passport from 'passport'
import local from 'passport-local'
import passportJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
import {modeloUsuarios} from '../models/usuarios.model.js'

export const initPassport=()=>{
    passport.use('registro', new local.Strategy(
        {passReqToCallback: true, usernameField:'email'},
        async(req, username, password, done)=>{
            try{
                let {nombre, email} = req.body
                if(!nombre || !email || !password) return done(null, false, {message:'Complete nombre, email y password'})

                let existe=await modeloUsuarios.findOne({email})
                if(existe) return done(null, false, {message:`Usuario ${username} existente en DB`})

                let usuario=await modeloUsuarios.create({
                    nombre, email,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
                })

                return done(null, usuario)

            }catch (error){
                return done(error)
        }
        }
    ))
}