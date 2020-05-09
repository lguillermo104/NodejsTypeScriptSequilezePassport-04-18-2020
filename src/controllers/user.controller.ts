import { Request, Response} from 'express'
import  User, { IUser } from '../models/user'
import jwt from 'jsonwebtoken'
import  config from '../config/config'
import bcrypt from 'bcrypt';

import errorHelper from '../middlewares/errors';
import user from '../models/user';
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

// bucar el suario por id.
export const buscarUsuarioPorId =  errorHelper( async(req: Request, res: Response): Promise<Response>=> {
   

    const id = req.params.id;

    let user = await User.findById(id);

    return res.status(200).json(user);          
    
});

// bucar el suario por id.
export const listarTodosUsuarios =  errorHelper( async(req: Request, res: Response): Promise<Response>=> {    

    let  desde  = req.query.desde || 0;
    desde = Number(desde);

    console.log(desde);
    let user = await User.find({})
        .skip(desde)
        .limit(5);

    let total = await User.find({}).count();

    return res.status(200).json({ok: true, data:{user: user, total: total} });          
    
})

// Actualizar el usuario
export const actualizarUsuario =  errorHelper( async(req: Request, res: Response): Promise<Response>=> {   

    
   let  { id } = req.params;
   let { passwordActual } = req.body;

    //Buscamos el usuario por el id.
    let user:any = await User.findById(id)

    if (!user) {
        return res.status(400).json( {ok:false, menssage: 'El usuario con el id' + id + ' no existe. '});
    }

    // Comparamos si la contraseña es correcta al registro de usuario.
    const ismatch = await user.comparePassword(passwordActual);

    // si la contraseña es es incorrecta mandamo una repuesta contraseña incorrecta.
    if ( !ismatch ) return  res.status(400).json({ok: false, message: "La contraseña actual no es correcta." })

    //Actualiza el usuario y debuelve la repuesta.
    user.email = req.body.email;
    user.password = req.body.password;

    user = await user.save();
    return res.status(200).json({ok: true, menssage: 'Usuario actualizado corectamente', data: user})          
    
});

// Buscar Usuario por email.

// bucar el suario por id.
export const buscarUsuarioPorEmial =  errorHelper( async(req: Request, res: Response): Promise<Response>=> {  
    
    let user;
    let total;

    let  desde  = req.query.desde || 0;
    let email = req.query.email || "";
    desde = Number(desde);
    email = String(email);

    if (!email){ 
         user = await User.find({}, { _id:1, role:1, active:1, email:1})
            .skip(desde)
            .limit(5);

             total = await User.find({}, { _id:1, role:1, active:1, email:1}).count();
    } else {
        user =  await User.find({}, { _id:1, role:1, active:1, email:1}).or([{email: {$regex: email, $options: 'i'}}])
        .skip(desde)
        .limit(5)

         total = await User.find({}, { _id:1, role:1, active:1, email:1}).or([{email: {$regex: email, $options: 'i'}}]).count();

    }

    return res.status(200).json({ok: true, data:{user: user, total: total} });          
    
})

