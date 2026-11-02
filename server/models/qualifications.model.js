import mongoose from 'mongoose'

const Qualification = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Title is required'
    },
    firstname: {
        type: String,
        trim: true,
        required: 'First name is required'
    },
    lastname: {
        type: String,
        trim: true,
        required: 'Last name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        // match: [/.+\@.+\.._/, 'Please fill a valid email address'],
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
        reuquired: 'Email is required'
    },
    completion: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        trim: true,
        required: 'Description is required'
    },
    salt: String
}, {
    versionKey: false
});

export default mongoose.model('Qualification', Qualification);