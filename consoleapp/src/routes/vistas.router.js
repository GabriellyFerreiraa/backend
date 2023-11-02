import { Router } from "express";
export const router=Router()

router.get('/registro',(req,res)=>{


    res.status(200).render('registro')
})

router.get('/login',(req,res)=>{


    res.status(200).render('login')
})
router.get('/perfil',(req,res)=>{


    res.status(200).render('perfil')
})