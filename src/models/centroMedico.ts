import { model, Schema, Document, SchemaType, Types } from 'mongoose' 
var uniqueValidator = require('mongoose-unique-validator');


export interface ICentroMedico extends Document{
    email: string;
    rncCedula: string;
    direccion: string;
    agendaTelefonica?: { tel?: string, fax?: string, whaptsapp?: string } ;
    medicos: object;
    
}



// Definimo el modelo.
const userSchema = new Schema({
    nombre: {
        type: String,       
        unique: "El nombre debe de ser unico",
        required: true,
        lowercase: true,
        trim: true,
        minlength: [3]
    },
    rncCedula: {
        type: String,
        required: "El rncCedula es requerido",
        unique: "El rncCedula debe de ser unico",

    },
    direccion: {
        type: String,
        required: "La direcion es requedida"
    },
    agendaTelefonica:[{
        tel : {
            type: String

        },
        fax: {
            type: String

        },
        whatsapp: {
            type: String
        }        
    }],
    medicos: [{
         type: Schema.Types.ObjectId, 
         ref: 'Medicos'   
        }]


});




export default model<ICentroMedico>('CentroMedico', userSchema);