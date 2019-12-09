const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        unique: true,
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.statics.validateLogin = async (email, password) => {
    const user = await User.findOne({email})
    if (!user){
        throw new Error('Email Tidak Ditemukan')
    }

    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword){
        throw new Error('Password Salah')
    }

    return user
}

userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'taskmanageuserjwt')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.pre('save', async function(next){
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User