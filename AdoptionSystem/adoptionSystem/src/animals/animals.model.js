import mongoose, { Schema } from "mongoose";

const animalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    age: {
        type: String,
        maxLength: 3,
        required: true
    },
    responsible: {
        type: Schema.ObjectId,
        required: true,
        unique: true,
        ref: 'user'
    }
})

export default mongoose.model('animal', animalSchema)