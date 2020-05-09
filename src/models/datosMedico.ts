import { model, Schema, Document, SchemaType, Types } from 'mongoose' 
var uniqueValidator = require('mongoose-unique-validator');


export interface IDatosMedico extends Document{
    nombre: string;
    especialidad: string;
    direccion: string;
    agendaTelefonica?: { tel?: string, fax?: string, whaptsapp?: string } ;
    medicos: object;
    
}



// Definimo el modelo.
const DatosMedicoSchema = new Schema({
    nombre: {
        type: String,       
        unique: "El nombre debe de ser unico",
        required: true,
        lowercase: true,
        trim: true,
        minlength: [3, 'El nombre debe de tener minimo 3 caracteres']
    },
    especialidad:{
        type: String,        
        unique: "El rncCedula debe de ser unico",

    },
    cedula: {
        type: String,
        required: "la cedula es requerida"
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
    email: {
         type: String   
        },
    centroMedico: [{
        type: Schema.Types.ObjectId, 
        ref: 'centrosMedico'

    }]


});




export default model<IDatosMedico>('DatosMedico', DatosMedicoSchema);