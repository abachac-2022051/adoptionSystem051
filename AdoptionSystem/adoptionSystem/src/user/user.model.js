import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        lowerCase: true,
        required: true
    },
    password: {
        type: String,
        minLength:[8,'password must 8 characters'],
        required: true
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum:['ADMIN','CLIENT'],//solo los datos que estan el el arreglo se puden guardar
        required: true
    }

})

export default mongoose.model('user',userSchema)