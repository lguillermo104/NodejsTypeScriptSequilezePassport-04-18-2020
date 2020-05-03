import {Response, Request} from 'express';

export default  function(callback:Function) {
    return async(req: Request, res: Response) =>{
        try {
            await callback(req, res);

            
        } catch (error) {
                if (error.name = "ValidationError") {
                    res.status(400).json(error);

                }else {
                    res.status(500).json("Error en el servidor");
                }
                
           
        }

    }
   
}