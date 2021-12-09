const Huviaruud = require("../models/Huviaruud");
const MyError = require ("../utils/myError");
const asyncHandler = require ("express-async-handler");

//api/v1/books
//api/v1/teachers/:teachId/rooms
exports.getHuviars = asyncHandler(async (req, res, next) => {
    const q = await Huviaruud.find();
    res.status(200).json({
        success: true,
        count: q.length,
        data: q,
    });
});

exports.createHuviar = asyncHandler(async (req, res, next) => {
    const query = await Huviaruud.create(req.body);
    res.status(200).json({
        success: true,
        data: query,
    });
});

exports.updateHuviar = asyncHandler(async (req, res, next) => {
    const q = await Huviaruud.findById(req.params.id);
    if (!q) {
        throw new MyError(req.params.id + " бичлэг олдсонгүй", 400);
    }
    q.teacher = req.body.teacher;
    q.cls = req.body.cls;
    q.week = req.body.week;
    q.room = req.body.room;
    await q.save();
    res.status(200).json({
        success: true,
        data: q,
    });
});

exports.deleteHuviar = asyncHandler(async (req, res, next) => {
    const q = await Huviaruud.findByIdAndDelete(req.params.id);
    if (!q) {
        throw new MyError(req.params.id + " ID-тэй хувиар байхгүй", 400);
    }
    res.status(200).json({
        success: true,
        data: q,
    });
});