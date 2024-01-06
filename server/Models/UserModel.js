const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        phone: { type: String, unique: true },
        name: { type: String },
        avatar: { type: String },
        activated: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);