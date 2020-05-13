// Insertar un centro medico.
import mongoose from 'mongoose';
import { Router, Request, Response, NextFunction, response } from 'express';
import centrosMedicos, {ICentrosMedicos}  from '../models/centrosMedicos.model';



// Crear centros medicos.
export const  crearCentrosMedicos = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    let user = req.query.user; 
    try {
        let { nombre, rncCedula, direccion, AgendaTelefonica, email, medicos } = req.body;

        let centroMedico:ICentrosMedicos = new centrosMedicos({ nombre, rncCedula, direccion, AgendaTelefonica, email, medicos});

        let savedCentroMedico  = await centroMedico.save();

        if (savedCentroMedico) {
            return res.status(200).json(savedCentroMedico);
        }else {
            return res.status(500).json('Error al guardar el centro medico'); 
        }
    
        
    } catch (error) {
        return res.status(500).json('Error al guardar el centro medico'); 
        
    }  
}

// Buscar todos los centros medicos 
export const BuscarTodosCentrosMedicos = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    let result = await centrosMedicos.find({}, {nombre:1, direccion:1, rncCedula:1, AgendaTelefonica:1, email:1, medicos:1});

   

   console.log(centrosMedicos.find());
   return res.status(200).json(result);

}

// Buscar los centro medicos por id.
export const BuscarCentrosMedicosPorId = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    let { id }  = req.params

    let result = await centrosMedicos.findById(id);  

    
   return res.status(200).json(result);

}


// Buscar por nombre o rncCedula.
export const BuscarCentrosMedicosPorNombre = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

   let { nombre, rncCedula, id } = req.body;


    

    let result = await centrosMedicos.find().or([{ _id: id  },{ nombre }, { rncCedula }]);

    
   return res.status(200).json(result);

}

// eliminar centro medico.
export const eliminarCentroMedico = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        let { id } = req.params

        let result = await centrosMedicos.findByIdAndDelete(id);
        
        return res.status(200).json('Usuario eliminado correctamente');
        
    } catch (error) {
        return res.status(200).json('Error al emiminar el usuario o usuario no encontrado');
        
    }    

}

// Actualizar centro medico
export const actualizarCentroMedico = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {        

        let result = await centrosMedicos.findByIdAndUpdate(req.body.id, req.body);
        
        return res.status(200).json('usuario Acutalizado Correctamente');
        
    } catch (error) {
        return res.status(200).json('Error al actualizar el usuario');
        
    }    

}







  
  

