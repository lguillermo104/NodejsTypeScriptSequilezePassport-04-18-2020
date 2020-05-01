// Importamos el router desde express.
import  { Router } from 'express'
const router = Router();

// importamos los controlladores.
import { signIn, signUp } from '../controllers/user.controller'

// Creamos las rutas y asignamos el controlador.
router.post('/registrar/usuario', signUp );
router.post('/entrar/usuario', signIn );


//exportamos la ruta.
export default router;