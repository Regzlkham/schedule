const mongoose = require("mongoose");

const ClssSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Ангийн нэрийг энд оруулна"],
        unique: true,
        trim: true, //hooson zaigui mongoose automataar tseverleh
        maxlength: [3, 'Ангийн нэрний урт дээд тал нь 3 тэмдэгт байх ёстой'],
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

module.exports = mongoose.model("Clsses", ClssSchema);