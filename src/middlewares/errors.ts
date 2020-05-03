import {Response, Request} from 'express';

export default  function(callback:Function) {
    return async(req: Request, res: Response) =>{
        try {
            await callback(req, res);

            
        } catch (error) {
            if (error.name) {
                res.status(400).json(error);
            }            
        }

    }
   
}