import {Router} from 'express';
export const router=Router()

router.get('/',(req,res)=>{
    res.status(200).json({saludo:'Router Heroes'})
})

const mid01=(req,res,next)=>{
    console.log('paso por mid01')
    next()
}

const mid02=(req,res,next)=>{
    console.log('paso por mid02')
    req.heroes=['Batman','Hulk']
}
const handler=(req,res)=>{
    res.json({
        heroes:req.heroes
    })
}