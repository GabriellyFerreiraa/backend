import { Router } from "express";
import crypto from 'crypto';
import {modeloUsuarios} from '../models/usuarios.models.js'
export const router=Router()

router.post('/registro',async(req,res)=>{
  let {nombre, email, password}=req.body

  if(!nombre || !email || !password){
    return res.status(400).send('faltan datos')
  }

  let existe=await modeloUsuarios.findOne({email})
  if(existe){
    return res.satus(400).send(`Usuario ya esta registrado: ${email}`)
  }

  password=crypto.createHmac('sha256','palabraSecreta').update(password).digest('base64')

  await modeloUsuarios.create({
    nombre, email, password
  })
  
  res.redirect(`/login?usuarioCreado=${email}`)
})