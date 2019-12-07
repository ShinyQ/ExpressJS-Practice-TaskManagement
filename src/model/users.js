const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email Tidak Valid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password Tidak Valid')
            }
        }
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        trim: true,
        default: 0,
        validate(value) {
            if (value <= 0) {
                throw new Error('Umur Harus Lebih Dari 0')
            }
        }
    },
    class: {
        type: String
    },
    date: { type: Date, default: Date.now },
})

module.exports = User