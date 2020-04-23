import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

// Importamos las rutas de la aplicacion.
import authRoutes from './routes/auth.routes'

// Initilizations
const app = express();


// Settings

app.set('port', process.env.PORT || 3000 );


// Middlewares
app.use(morgan('dev'));
app.use(cors());    
app.use(express.urlencoded({extended: false }));
app.use(express.json());


// routes
app.get('/', (req,  res) => {
    res.send(`The api is at http://localhost:${app.get('port')} `);
});

app.use(authRoutes);




export default app;