const mongoose = require("mongoose");

const Huviaruud = new mongoose.Schema({
    room: {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
        required: true,
    },

    cls: {
        type: mongoose.Schema.ObjectId,
        ref: "Clsses",
        required: true,
    },

    week: {
            type: Number,
            required: true,
            default:0,
    },
    
    teacher: {
        type: mongoose.Schema.ObjectId,
        ref: "Teacher",
        required: true,
    },

    //ugugdliin sand hezee uusgesen be
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Huviar", Huviaruud);