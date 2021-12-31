const { Schema, model } = require('mongoose')

const schema = new Schema({
    username: { 
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Name must be at least 3 characters long'], 
        match: [/^[a-zA-Z0-9]+$/, 'Username  may contain only latin letters and numbers']
    },
    hashedPassword: { type: String, required: true },

})

module.exports = model('User', schema)