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
    minlength:[3,"El Nombre debe tener minimo tres letras"],
    trim: true

  },
  rncCedula: {
    type: String,
    required: "El RNC / Cedula es requerida",
    trim: true

  },
  direccion: {
    type: String,
    required: "La Direccion es requerida",
    trim: true

  },
  provincia:{
    type: String,
    required: "La provincia es requerida",
    trim: true


  },
  AgendaTelefonica: {
      tel: {
        type: String,
        required: "El Telefono es requerida",
        trim: true
    
      },
      fax: {
       type: String,
       trim: true
      },
      whatsapp:{
        type: String,
        trim: true

      } ,
    },
    email: {
      type: String,
      required: "El email es requerida",
      trim: true,
      validate: {
          validator: function(v:any) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
          },
          message: props => `${props.value}:  Este emial no es valido!`
        },
      },
    medicos: [ { type: Schema.Types.ObjectId, ref: 'datosMedicos'}],
    usuario: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true
});

export default model<ICentrosMedicos>('centrosMedicos', centrosMedicosSchema);