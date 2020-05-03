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

    if (!req.body.email || !req.body.password ) {
        throw createError(400, "El email o la Contraseña no puede estar en blanco",{ cod: 201 })
    }

    const email = req.body.email;

    // Buscamos el usuario en la base de datos.
    const user = await User.findOne({email});

    // Si el usuario existe.
    if(user) {
        throw createError(400, "Este email ya esta registrado",{ ok:false, error: { cod: 201, name:"validatorError", path: "email", value: email} })  
    }

    let newUser = new User(req.body);

    
        await newUser.save();
        return res.status(201).json(newUser);   
    
})

// Logear un usuario.
export const signIn = async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password ) {
        return res.status(400).json({ msg: 'Please. send your email and password' });
    }

    const email:string = req.body.email;
    const password: string = req.body.password;

   const user = await User.findOne({email});

   if (!user) {
       return res.status(400).json({msg: 'the user does not exists'});
   }


  const ismatch = await user.comparePassword(password);

  if (ismatch) {
    // crear el token  
    let token = createToken(user);

       // formatear la respuesta 
      let respuesta = {
        status: 200,
        ok: true,
        data: {
            token: token 
        }
      };
       
      return res.status(200).json(respuesta);
  }

  return res.status(400).json('the email o password is incorrect')
    
}