const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
    },
    address: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 14,
    },
    image: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 1024,
    },
    bizNumber: {
        type: String,
        minlength: 7,
        maxlength:50,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Card = mongoose.model("card", cardSchema);

exports.Card = Card;