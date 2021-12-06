const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Өрөөний дугаарыг энд оруулна"],
        unique: true,
        trim: true, //hooson zaigui mongoose automataar tseverleh
        maxlength: [3, 'Өрөөний дугаар дээд тал нь 3 тэмдэгт байна.'],
    },
    teacher: {
        type: mongoose.Schema.ObjectId,
        ref: "Teacher",
        required: true,
    },
    createUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },

    updateUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User",     
    },

    //ugugdliin sand hezee uusgesen be
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Rooms", RoomSchema);