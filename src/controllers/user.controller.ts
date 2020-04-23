import { Request, Response} from 'express'
import  User, { IUser } from '../models/user'
import jwt from 'jsonwebtoken'
import  config from '../config/config'

// Crear el token 
function  createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400 
    } );
    
}

// Registar el usuario
export const signUp = async (req: Request, res: Response): Promise<Response>=> {

    if (!req.body.email || !req.body.password ) {
        return res.status(400).json({ msg: 'Please. send your email and password' });
    }

    const email = req.body.email;

    // Buscamos el usuario en la base de datos.
    const user = await User.findOne({email});

    // Si el usuario existe.
    if(user) {
        return res.status(400).json({msg: 'the user already exists'});  
    }

    let newUser = new User(req.body);

    await newUser.save();

    return res.status(201).json(newUser);
    
}

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
      let token = createToken(user); 
      return res.status(200).json(token);
  }

  return res.status(400).json('the email o password is incorrect')
    
}