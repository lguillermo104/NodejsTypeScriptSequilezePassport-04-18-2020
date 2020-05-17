import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import  passport from 'passport'
import passportMiddleware from './middlewares/passport'


// Importamos las rutas de la aplicacion.
import authRoutes from './routes/auth.routes'
import specialRoutes from './routes/special.routes'
import centroMedico from  './routes/centroMedico'; 
import  datosMedicosRoutes from './routes/datosMedicos.routes';

// Initilizations
const app = express();


// Settings

app.set('port', process.env.PORT || 3000 );


// Middlewares
app.use(morgan('dev'));
app.use(cors());    
app.use(express.urlencoded({extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);


// routes
app.get('/', (req,  res) => {
    res.send(`The api is at http://localhost:${app.get('port')} `);
});



app.use(authRoutes);
app.use(centroMedico);
app.use(datosMedicosRoutes);
app.use(specialRoutes);



export default app;