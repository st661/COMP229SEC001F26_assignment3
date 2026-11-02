import mongoose from 'mongoose'
import crypto from 'crypto'
// import crypto from 'node:crypto'
// import { promisify } from 'node:util'

// const scrypt = promisify(crypto.scrypt)
// const passwordKeyLength = 64

const Users = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        // match: [/.+\@.+\.._/, 'Please fill a valid email address'],
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    hashed_password: {
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
// }, {
//     versionKey: false
// });

Users.virtual('password')
.set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
    // this.hashed_password = password;
})
.get(function() {
    return this._password;
});

Users.path('hashed_password').validate(function(v) {
    if(this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if(this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);

Users.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if(!password) return ''
        try {
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        } catch(err) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

// Users.pre('save', async function() {
//     if (!this.isModified('password')) return

//     this.salt = this.salt || crypto.randomBytes(16).toString('hex')
//     const derivedKey = await scrypt(this.password, this.salt, passwordKeyLength)
//     this.password = `scrypt$${derivedKey.toString('hex')}`
// })

// Users.methods.authenticate = async function(plainText) {
//     if (typeof plainText !== 'string' || !plainText) return false

//     if (this.password.startsWith('scrypt$')) {
//         if (!this.salt) return false
//         const expected = Buffer.from(this.password.slice('scrypt$'.length), 'hex')
//         const actual = await scrypt(plainText, this.salt, passwordKeyLength)
//         return expected.length === actual.length && crypto.timingSafeEqual(expected, actual)
//     }

//     if (!this.salt) {
//         return this.password === plainText
//     }

//     const legacyHash = this.encryptPassword(plainText)
//     const expected = Buffer.from(this.password, 'hex')
//     const actual = Buffer.from(legacyHash, 'hex')
//     return expected.length === actual.length && crypto.timingSafeEqual(expected, actual)
// }

// Users.methods.encryptPassword = function(password) {
//     if (!password || !this.salt) return ''
//     return crypto
//         .createHmac('sha1', this.salt)
//         .update(password)
//         .digest('hex')
// }

// Users.methods.makeSalt = function() {
//     return crypto.randomBytes(16).toString('hex')
// }

export default mongoose.model('Users', Users);