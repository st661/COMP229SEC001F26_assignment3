import mongoose from 'mongoose'

const Contact = new mongoose.Schema({
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
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    salt: String
}, {
    versionKey: false
});

export default mongoose.model('Contact', Contact);