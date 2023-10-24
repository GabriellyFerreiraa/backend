import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import { router as vistasRouter } from './routes/vistas.router.js';
import { router as sessionsRouter } from './routes/sessions.router.js';


const PORT=3000;

const app=express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'/public')));

app.use('/', vistasRouter)
app.use('/api/sessions', sessionsRouter)

const server=app.listen(PORT,()=>{
    console.log(`Server  escuchando en puerto ${PORT}`);
});

const conectar=async()=>{
    try{
        await mongoose.connect('mongosh "mongodb+srv://cluster0.y3nve1p.mongodb.net/" --apiVersion 1 --username gabiferreira101')
        console.log('Conexcion a DB establecida')
    } catch(err){
        console.log('Error al conectar con el servidor')
    }
}

conectar();