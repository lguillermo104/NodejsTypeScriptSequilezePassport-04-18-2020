// Importamos el router desde express.
import  { Router } from 'express'
var jimp = require('sharp');
const router = Router();


// importamos los controlladores.
import { signIn, signUp, buscarUsuarioPorId, listarTodosUsuarios, actualizarUsuario, buscarUsuarioPorEmial, BorrarUsuarioPorId, actualizarUsuarioSinContraseña } from '../controllers/user.controller';
import { getphotos, createPhoto } from '../controllers/img.controller';

import multer from '../libs/multer';

// Creamos las rutas y asignamos el controlador.
router.post('/registrar/usuario', signUp );
router.post('/entrar/usuario', signIn );
    
router.route('/usuarios')
    .get(listarTodosUsuarios)
    

    router.route('/usuarios/buscar')
    .get(buscarUsuarioPorEmial)
    

router.route('/usuario/:id')
    .get(buscarUsuarioPorId)
    .put(actualizarUsuario)
    .delete(BorrarUsuarioPorId)

router.route('/usuarios/:id')
    .put(actualizarUsuarioSinContraseña);

router.route('/photos/usuario')
    .post(multer.single('image'), createPhoto)
    .get(getphotos)


//exportamos la ruta.
export default router;