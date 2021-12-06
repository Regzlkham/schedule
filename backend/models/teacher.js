const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, "Багшийн нэрийг оруулна уу"],
        unique: true,
        trim: true, //hooson zaigui mongoose automataar tseverleh
        maxlength: [50, 'Багшийн нэрний урт дээд тал нь 50 тэмдэгт байх ёстой.'],
    },
    email:{
        type: String,
        required: [true, "Багшийн э-майл хаягийг заавал оруулах ёстой."],
        maxlength: [50, 'Урт дээд тал нь 50 тэмдэгт байх ёстой.'],
    },
    phone:{
        type: Number,
        required: [true, "Утасны дугаарыг оруулна уу"],
        maxlength: [10, 'Урт дээд тал нь 10 тэмдэгт байх ёстой'],
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
}
);

// TeacherSchema.virtual('rooms', {
//     ref: 'Room',
//     localField: "_id",
//     foreignField: "category",
//     justOne: false,
// });

module.exports = mongoose.model("Teacher", TeacherSchema);