// Importamos el router desde express.
import  { Router } from 'express'
const router = Router();


// importamos los controlladores.
import { signIn, signUp } from '../controllers/user.controller';
import { getphotos, createPhoto } from '../controllers/img.controller';

import multer from '../libs/multer';

// Creamos las rutas y asignamos el controlador.
router.post('/registrar/usuario', signUp );
router.post('/entrar/usuario', signIn );

router.route('/photos/usuario')
    .post(multer.single('image'),  createPhoto)
    .get(getphotos)


//exportamos la ruta.
export default router;