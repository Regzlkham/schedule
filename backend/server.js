const express = require("express");
const dotenv = require("dotenv");
var path = require("path");
var rfs = require("rotating-file-stream");
const connectDB = require("./config/db");
const colors = require('colors');
const errorHandler = require("./middleware/error")
var morgan = require('morgan');
const logger = require("./middleware/logger");

//Router оруулж ирэх
const classesRoutes = require("./routes/clsses");
const roomsRoutes = require("./routes/rooms");
const teachersRoutes = require("./routes/teachers");
const usersRoutes = require("./routes/users");

const cors = require("cors");

// Аппын тохиргоог process.env рүү ачаалах
dotenv.config({ path: "./config/config.env" });
const app = express();

connectDB();

// create a write stream (in append mode)
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
  });


//body parser
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(morgan('combined', { stream: accessLogStream }));
app.use("/api/v1/classes", classesRoutes);
app.use("/api/v1/rooms", roomsRoutes);
app.use("/api/v1/teachers", teachersRoutes);
app.use("/api/v1/users", usersRoutes);

app.use(errorHandler);

const server = app.listen(
  process.env.PORT,
  console.log(`Express сэрвэр ${process.env.PORT} порт дээр аслаа... `.rainbow)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`.underline.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
