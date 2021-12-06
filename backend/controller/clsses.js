const Clss = require("../models/clsses");
const MyError = require ("../utils/myError");
// const asyncHandler = require("../middleware/asyncHandler");
const asyncHandler = require ("express-async-handler");

exports.getClsses = asyncHandler(async (req, res, next) => {
    const clsses = await Clss.find();
    
    res.status(200).json({
        success: true,
        count: clsses.length,
        data: clsses,
    });
});

exports.getClss = asyncHandler(async (req, res, next) => {
    const clss = await Clss.findById(req.params.id);
    
    if (!clss) {
        throw new MyError(req.params.id + " ID-тэй анги байхгүй!", 400);
    }
    
    res.status(200).json({
        success: true,
        data: clss,
    });
});

exports.createClss = asyncHandler(async (req, res, next) => {
    req.body.createUser = req.userId;
    const clss = await Clss.create(req.body);
    
    res.status(200).json({
        success: true,
        data: clss,
    });});

exports.updateClss = asyncHandler(async (req, res, next) => {
    req.body.updateUser = req.userId;
    const clss = await Clss.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    
    if (!clss) {
        throw new MyError(req.params.id + " ID-тэй анги байхгүй", 400);
    }
    
    res.status(200).json({
        success: true,
        data: clss,
    });
});

exports.deleteClss = asyncHandler(async (req, res, next) => {
    const clss = await Clss.findByIdAndDelete(req.params.id);
    
    if (!clss) {
        throw new MyError(req.params.id + " ID-тэй анги байхгүй", 400);
    }
    
    res.status(200).json({
        success: true,
        data: clss,
    });
});