import { model, Schema, Document, SchemaType, Types } from 'mongoose'; 


export  interface ICentrosMedicos extends  Document {
  nombre: string,
  rncCedula: string,
  direccion: string,
  AgendaTelefonica: {
    tel: string,
    fax?: string,
    whatsapp?: string,
  },
  email: string
  medicos?: Types.ObjectId

}  

// Datos medicos.
const centrosMedicosSchema = new Schema({
  nombre:{
    type: String,
    required: "El Nombre es requerido",
    minlength:[3,"El Nombre debe tener minimo tres letras"]

  },
  rncCedula: {
    type: String,
    required: "El RNC / Cedula es requerida"

  },
  direccion: {
    type: String,
    required: "La Direccion es requerida"

  },
  AgendaTelefonica: {
      tel: {
        type: String,
        required: "El Telefono es requerida"
    
      },
      fax: String,
      whatsapp: String,
    },
    email: {
      type: String,
      required: "El email es requerida",
      validate: {
          validator: function(v:any) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
          },
          message: props => `${props.value}:  Este emial no es valido!`
        },
      },
    medicos: [ {type: Schema.Types.ObjectId, ref: 'datosMedicos'}],
    usuario: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

export default model<ICentrosMedicos>('centrosMedicos', centrosMedicosSchema);