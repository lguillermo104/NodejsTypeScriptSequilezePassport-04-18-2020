 /*

          try {
            // Construimos un autor del modelo persona. 
            const author = new Person({
                _id: new mongoose.Types.ObjectId(),
                name: 'Ian Fleming',
                age: 50
              }); 
              
           // Guardamos el autor en el modelo persona   
           let autor  =  await author.save();

           // Construimos una historia
           const story1 = new Story({
            title: 'Casino Royale',
            author: autor._id    // assign the _id from the person        
            
          });

          let historia = await story1.save();

          res.status (200).json({autor, historia});

           
              
          } catch (error) {
              
            res.json(error);
          }

           
        try {
            let persona =  await  Story.findOne({ title: 'Casino Royale' }).populate('author');  
            res.status(200).json(persona);         
        } catch (error) {
            res.status(500).json(error);
        }
       
          */
import { Router } from 'express';         
import mongoose  from 'mongoose';
const router = Router();
import { crearCentrosMedicos, BuscarTodosCentrosMedicos, BuscarCentrosMedicosPorId, BuscarCentrosMedicosPorNombre, eliminarCentroMedico, actualizarCentroMedico } from '../controllers/centrosMedicos.controller';




router.route('/centromedico')
    .post(crearCentrosMedicos)
    .get(BuscarTodosCentrosMedicos)
    .put(actualizarCentroMedico)


router.route ('/centromedico/:id')
    .get(BuscarCentrosMedicosPorId)
    .delete(eliminarCentroMedico)

    router.route ('/centromedico/buscar')
        .post(BuscarCentrosMedicosPorNombre)

    


//exportamos la ruta.
export default router;