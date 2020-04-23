import app from './app'
import './database'

// corremos el servido en el puerto especificado 
app.listen(app.get('port'));


console.log (`Server on Port ${app.get('port')} `);