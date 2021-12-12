const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required'],
    },
    public :{type: String},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    
},{timestamps:true})

module.exports = model('Product', schema)