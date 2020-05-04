import { Request, Response} from 'express'
import  User, { IUser } from '../models/user'
import jwt from 'jsonwebtoken'
import  config from '../config/config'

import errorHelper from '../middlewares/errors';
var createError = require('http-errors');

// Crear el token 
function  createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400 
    } );
    
}

// Registar el usuario
export const signUp =  errorHelper( async(req: Request, res: Response): Promise<Response>=> {
   

    let newUser = new User(req.body);

    
        await newUser.save();
        return res.status(201).json( {ok:true, status:201, menssage:'Usuario Registrado Exitosamente', data: newUser});   
    
})

// Logear un usuario.
export const signIn = errorHelper( async (req: Request, res: Response) => {
   

    const email:string = req.body.email;
    const password: string = req.body.password;

   const user = await User.findOne({email});

   if (!user) {
       return res.status(400).json({ok: false, status: 400, message: 'Email o password incorrecta'});
   }


  const ismatch = await user.comparePassword(password);

  if (ismatch) {
    // crear el token  
    let token = createToken(user);

       // formatear la respuesta 
      let respuesta = {
        status: 200,
        ok: true,
        message: 'login exitoso',
        data: {
            user: user,
            token: token 
        }
      };
       
      return res.status(200).json(respuesta);
  }

  return res.status(400).json({ok: false, status: 400, message: 'Email o password incorrecta'});
    
})