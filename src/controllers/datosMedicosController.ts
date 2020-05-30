// Insertar un centro medico.
import mongoose from 'mongoose';
import { Router, Request, Response, NextFunction, response } from 'express';
import DatosMedicos, {IDatosMedico}  from '../models/datosMedicos.model';
import User from '../models/user';
import  asyncHelper  from '../middlewares/errors' 
import datosMedicosModel from '../models/datosMedicos.model';

// Crear centros medicos.
export const  crearDatosMedicos = asyncHelper (async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

   // let userId:string = String(req.query.user);
   
    
        

        let savedDatosMedicos = new DatosMedicos(req.body);

        savedDatosMedicos  = await savedDatosMedicos.save();

        
            return res.status(200).json({ok: true ,message: 'Creado el dato medidos', data:savedDatosMedicos });           
   
});

// Buscar todos los datos medicos.
export const  buscarTodosDatosMedicos = asyncHelper (async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    // Variables para la paginacion.
    let  porPagina  = Number(req.query.porPagina) || 8; 
    let pagina = Number(req.query.pagina) || 1  
    console.log(pagina);   
         
    let  result  =  await datosMedicosModel.find({}).skip((porPagina * pagina) -porPagina).limit(porPagina);  
    let total = await datosMedicosModel.find({}).count();
         
    return res.status(200).json({ok: true , message: 'Datos medico encontrado', data: {datosMedicos: result}, total: total });           
    
 });


// Buscar por id.
export const  buscarPorId = asyncHelper (async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    // let userId:string = String(req.query.user); 
        let  { id }  = req.params;
         
       let  result  = await datosMedicosModel.findById(id); 
       
        return res.status(200).json({ok: true ,message: 'Datos medico encontrado', data:result });           
    
 });

 // eliminar centro medico.
export const eliminarDatosMedicos = asyncHelper ( async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
   
    let { id } = req.params

    let result = await datosMedicosModel.findByIdAndDelete(id);
    
    return res.status(200).json('Datos Medicos eliminado correctamente');
    

})


// Actualizar Dato Medico
export const actualizarDatoMedico = asyncHelper ( async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
     
        
    let { id } = req.params;      
    
    let { email, telefono, cedula, nombre, especialidad } = req.body;

    let result = await datosMedicosModel.findByIdAndUpdate(id, { email, telefono, cedula, nombre, especialidad });

    console.log(result);        
    return res.status(200).json('Datos Medico Acutalizado Correctamente');
    


})

