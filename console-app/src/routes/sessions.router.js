import { Router } from "express";

export const router=Router()

router.post('/registro',(req,res)=>{
  let {nombre, email, password}=req.body

  if(!nombre || !email || !password){
    return res.status(400).send('faltan datos')
  }

  res.status(200).json({})
})