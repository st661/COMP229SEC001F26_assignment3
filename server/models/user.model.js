import mongoose from 'mongoose'
// const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        match: [/.+\@.+\.._/, 'Please fill a valid email address'],
        reuqired: 'Email is required'
    },
     title: {
        type: String,
        trim: true,
        required: 'Title is required'
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
    password: {
        type: String,
        required: 'Password is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    salt: String
});

UserSchema.virtual('password')
.set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    // this.hashed_password = password;
    // // this.hashed_password = this.encryptPassword
})
.get(function() {
    return this._password;
});
// UserSchema.path('hashed_password').validate(function(v) {
UserSchema.path('password').validate(function(v) {
    if(this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);

// UserSchema.methods = {
//     authenticate: function(plainText) {
//         return this.encryptPassword(plainText) === this._password
//     },
//     encryptPassword: function(password) {
//         if (!password) return ''
//         try {
//             return crypto
//             .createHmac('sha1', this.salt)
//             .update(password)
//             .digest('hex')
//         } catch (err) {
//             return ''
//         }
//     },
//     makeSalt: function() {
//         return Math.round((new Date().valueOf() * Math.random())) + ''
//     }
// }

// // module.exports = mongoose.model('User', UserSchema);
export default mongoose.model('User', UserSchema);