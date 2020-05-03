import { model, Schema, Document, SchemaType } from 'mongoose' 
var uniqueValidator = require('mongoose-unique-validator');
import bcrypt from 'bcrypt';

export interface IUser extends Document{
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>

}

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
}

// Definimo el modelo.
const userSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function(v:any) {
              return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `${props.value}:  Este emial no es valido!`
          },
        unique: "El email es requerido",
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: "la Contraseña es requerida",
        maxlength:[6,"La contraseña debe tener nimino 6 caracteres"]

    },
    img: {
        type: String
    },
    role: {
        type: String,        
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    active: {
        type: Boolean,
        default: true
    }

});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator, { message: 'El {PATH} debe de ser unico.' });

// Encriptar la contraseña del usuario.
userSchema.pre<IUser>('save', async function(next){
    const user = this;    
    if (!user.isModified('password')) return next;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt );
    user.password = hash;
    next();
});

// Comparar la contraseña
userSchema.methods.comparePassword = async function(password: string ): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', userSchema);