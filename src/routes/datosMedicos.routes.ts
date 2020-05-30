import { Router } from 'express';         
import mongoose  from 'mongoose';
const router = Router();

import {crearDatosMedicos, buscarPorId, buscarTodosDatosMedicos, eliminarDatosMedicos, actualizarDatoMedico } from '../controllers/datosMedicosController';


router.route('/datomedico')
        .post(crearDatosMedicos)
        .get(buscarTodosDatosMedicos)

router.route('/datomedico/:id')
        .get(buscarPorId)
        .delete(eliminarDatosMedicos)
        .put(actualizarDatoMedico)

//exportamos la ruta.
export default router;