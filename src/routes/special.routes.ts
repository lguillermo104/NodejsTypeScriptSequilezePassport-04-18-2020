import  { Router } from 'express'
import passport from 'passport'

const router = Router();



router.get('/special',passport.authenticate('jwt', { session:false }), (req,res) =>{
    res.send('bienvenido al sistema esta logeado y puede usar la aplicacion. enjoy');

});

export default router