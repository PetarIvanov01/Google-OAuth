const { Schema, model, default: mongoose } = require('mongoose');

const storySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default:'public',
        enum:['public','private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Story', storySchema);