const Room = require("../models/rooms");
const Teacher = require("../models/teacher");
const MyError = require ("../utils/myError");
const asyncHandler = require ("express-async-handler");

//api/v1/books
//api/v1/teachers/:teachId/rooms
exports.getRooms = asyncHandler(async (req, res, next) => {
    let query;

    if(req.params.teacherId){
        query = Room.find({ teacher: req.params.eacherId});
    }else{
        // query = Room.find().populate('teacher');
        query = Room.find().populate({
        path: 'teacher',
        select: 'name phone'
        });
    }

    const rooms = await query; 

    res.status(200).json({
        success: true,
        count: rooms.length,
        data: rooms,
    });
});

exports.getRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findById(req.params.id);
    
    if (!room) {
        throw new MyError(req.params.id + " ID-тэй өрөө байхгүй!", 400);
    }
    
    res.status(200).json({
        success: true,
        data: room,
    });
});

exports.createRoom = asyncHandler(async (req, res, next) => {
    const teacher = await Teacher.findById(req.body.teacher);

    if (!teacher) {
        throw new MyError(req.body.teacher + " ID-тэй багш байхгүй!", 400);
    }

    req.body.createUser = req.userId;

    const room = await Room.create(req.body);

    res.status(200).json({
        success: true,
        data: room,
    });
});

exports.updateRoom = asyncHandler(async (req, res, next) => {
    req.body.updateUser = req.userId;
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    
    if (!room) {
        throw new MyError(req.params.id + " ID-тэй багш байхгүй", 400);
    }
    
    res.status(200).json({
        success: true,
        data: room,
    });
});

exports.deleteRoom = asyncHandler(async (req, res, next) => {
    const room = await Room.findByIdAndDelete(req.params.id);
    
    if (!room) {
        throw new MyError(req.params.id + " ID-тэй багш байхгүй", 400);
    }
    
    res.status(200).json({
        success: true,
        data: room,
    });
});