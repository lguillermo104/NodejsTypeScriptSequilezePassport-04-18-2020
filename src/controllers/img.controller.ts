import { Request, Response } from 'express';
import user from '../models/user';
import path from 'path';

// Controlador que nos permite obtener las imagenes del servidos.
export function getphotos(req: Request , res: Response) {
    res.status(200).json('ok');

}

// controllador que nos permite subir imagenes al servidor
export async function createPhoto(req: Request , res: Response){
    try {

      const updateimg =   await user.updateOne({email:'codigo@hotmail.com'}, { $set: { img: req.file.path } });
      console.log(updateimg);
       // console.log(req.file);

        console.log('saving photo');
        console.log(req.body);

        return res.json({
         message: 'Photo successfuly saved'
        });
        
    } catch (error) {
        return res.json({
            message: error
           });
        
    }

    
}
