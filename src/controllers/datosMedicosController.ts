// Insertar un centro medico.
import mongoose from 'mongoose';
import { Router, Request, Response, NextFunction, response } from 'express';
import DatosMedicos, {IDatosMedico}  from '../models/datosMedicos.model';
import User from '../models/user';
import  asyncHelper  from '../middlewares/errors' 

// Crear centros medicos.
export const  crearDatosMedicos = asyncHelper (async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

   // let userId:string = String(req.query.user);
   
    
        

        let savedDatosMedicos = new DatosMedicos(req.body);

        savedDatosMedicos  = await savedDatosMedicos.save();

        
            return res.status(200).json({ok: true ,message: 'Creado el dato metidos', data:savedDatosMedicos });           
   
});