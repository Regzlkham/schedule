const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const Teacher = require("./models/teacher");
const Rooms = require("./models/rooms");
const Clsses = require("./models/clsses");
const User = require("./models/User");

dotenv.config({ path: "./config/config.env"});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
});

const teachers = JSON.parse(fs.readFileSync(__dirname + "/data/teachers.json", "utf-8")
);
const rooms = JSON.parse( fs.readFileSync(__dirname + "/data/rooms.json", "utf-8")
);
const clsses = JSON.parse( fs.readFileSync(__dirname + "/data/clsses.json", "utf-8")
);
const users = JSON.parse( fs.readFileSync(__dirname + "/data/user.json", "utf-8")
);

const importData = async () => {
    try {
        await Teacher.create(teachers);
        await Rooms.create(rooms);
        await Clsses.create(clsses);
        await User.create(users);
        console.log("Өгөгдлийг импортлолоо...".green.inverse);
    } catch (err) {
        console.log(err);
    }
};

const deleteData = async () => {
    try {
        await Teacher.deleteMany();
        await Rooms.deleteMany();
        await Clsses.deleteMany();
        await User.deleteMany();
        console.log("Өгөгдлийг бүгдийг устгалаа...".red.inverse);
    } catch (err) {
        console.log(err.red.inverse);
    }
};

if (process.argv[2] == "-i") {
    importData();
    } else if (process.argv[2] == "-d") {
    deleteData();
}