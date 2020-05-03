import {Response, Request} from 'express';

export default  function(callback:Function) {
    return async(req: Request, res: Response) =>{
        try {
            await callback(req, res);

            
        } catch (error) {
            if (error.status) {
                res.status(error.status).json(error);
            }  else {
                res.status(500).json("Error en el Servidor intentelo mas tarde");
            }          
        }

    }
   
}