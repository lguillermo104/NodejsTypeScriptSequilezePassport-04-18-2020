// Insertar un centro medico.
import mongoose from 'mongoose';
import { Router, Request, Response, NextFunction, response } from 'express';
import centrosMedicos, {ICentrosMedicos}  from '../models/centrosMedicos.model';
import User from '../models/user';
import  asyncHelper  from '../middlewares/errors' 



// Crear centros medicos.
export const  crearCentrosMedicos = asyncHelper (async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    let userId:string = String(req.query.user);
   
    
        let { nombre, rncCedula, direccion, tel, fax, whatsapp, email, medicos, prov } = req.body;

        let centroMedico:ICentrosMedicos = new centrosMedicos({ nombre, rncCedula, direccion, provincia: prov, AgendaTelefonica: { tel, fax, whatsapp }, email, medicos, usuario: userId });

        let savedCentroMedico  = await centroMedico.save();

        
            return res.status(200).json(savedCentroMedico);           
   
});

// Buscar todos los centros medicos 
export const BuscarTodosCentrosMedicos = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    let  porPagina  = Number(req.query.porPagina) || 8; 
    let pagina = Number(req.query.pagina) || 1  
    console.log(pagina); 

    let result = await centrosMedicos.find({}, {nombre:1, direccion:1, rncCedula:1, AgendaTelefonica:1, email:1, medicos:1, usuario:1, provincia:1}).skip((porPagina * pagina) -porPagina).limit(porPagina);
    let total = await centrosMedicos.find({}).count();
    return res.status(200).json({ ok: true, data: { centroMedico: result  }, total: total});

}

// Buscar los centro medicos por id.
export const BuscarCentrosMedicosPorId = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    let { id }  = req.params

    let result = await centrosMedicos.findById(id);  

    
   return res.status(200).json({ ok: true, message: 'Centro medico encontrado exitosamente', data:  result });

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
        
        let { id } = req.params;      
        
        let { nombre, rncCedula, direccion, tel, fax, whatsapp, email, medicos, prov } = req.body;

        let result = await centrosMedicos.findByIdAndUpdate(id, { nombre, rncCedula, direccion, provincia: prov, AgendaTelefonica: { tel, fax, whatsapp }, email});

        console.log(result);        
        return res.status(200).json('usuario Acutalizado Correctamente');
        
    } catch (error) {
        return res.status(200).json('Error al actualizar el usuario');
        
    } 
    
}

// para borrar
export const borrar = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
   let result  = await centrosMedicos.find({}).populate('usuario');

   return res.json(result)
    
}





  
  

