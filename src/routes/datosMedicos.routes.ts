import { Router } from 'express';         
import mongoose  from 'mongoose';
const router = Router();

import {crearDatosMedicos} from '../controllers/datosMedicosController';


router.route('/datomedico')
        .post(crearDatosMedicos)

//exportamos la ruta.
export default router;