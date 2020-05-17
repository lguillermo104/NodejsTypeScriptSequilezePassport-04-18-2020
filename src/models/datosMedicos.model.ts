import { model, Schema, Document, SchemaType, Types } from 'mongoose' 
var uniqueValidator = require('mongoose-unique-validator');


export interface IDatosMedico extends Document{
    especialidad: string;
    nombre: string;
    cedula: string;
    telefono: string ;
    email: string;
    
}

// Definimo el modelo.
const DatosMedicoSchema = new Schema({
    especialidad: {
        type: String,        
        required: 'el nombre es requerido',
        lowercase: true,
        trim: true
    },
    nombre:{
        type: String,        
        required: 'el nombre es requerido',
        trim: true

    },
    cedula: {
        type: String,
        required: "la cedula es requerida",
        trim: true
    },
    telefono: {
        type: String,
        required: "la cedula es requerida",
        trim: true
    },
    email: {
        type: String,
        required: "la cedula es requerida",
        validate: {
            validator: function(v:any) {
              return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `${props.value}:  Este emial no es valido!`
          },

    },
    usuario: [{ type: Schema.Types.ObjectId , ref: 'User'}],
    centroMedico: [{
        type: Schema.Types.ObjectId,
        ref: 'centrosMedicos'
    }]
});

export default model<IDatosMedico>('DatosMedico', DatosMedicoSchema);