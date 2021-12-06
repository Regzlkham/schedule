const Teacher = require("../models/teacher");
const MyError = require ("../utils/myError");
// const asyncHandler = require("../middleware/asyncHandler");
const asyncHandler = require ("express-async-handler");

exports.getTeachers = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const sort = req.query.sort;
    const select = req.query.select;
    
    ['select', 'sort', 'page', 'limit'].forEach( el => delete req.query[el]);

    //pagination huudaslalt
    const total = await Teacher.countDocuments();
    const pageCount = Math.ceil(total / limit);
    const start = (page - 1) * limit + 1;
    let end = start + limit - 1;
    if (end > total) end = total;

    const pagination = {total, pageCount, start, end, limit};

    if (page < pageCount) pagination.nextPage = page + 1;
    if (page > 1) pagination.prevPage = page -1;

    console.log(req.query, sort, select);
    const teachers = await Teacher.find(req.query, select)
    .sort(sort)
    .skip(start - 1)
    .limit(limit);
    
    res.status(200).json({
        success: true,
        count: teachers.length,
        data: teachers,
        pagination,
    });
});

exports.getTeacher = asyncHandler(async (req, res, next) => {
    const teacher = await Teacher.findById(req.params.id);
    
    if (!teacher) {
        throw new MyError(req.params.id + " ID-тэй багш байхгүй!", 400);
    }

    teacher.name += "-";
    teacher.save(function(err){
        if (err) console.log("error", err);
        console.log("saved...");
    });
    
    res.status(200).json({
        success: true,
        data: teacher,
    });
});

exports.createTeacher = asyncHandler(async (req, res, next) => {
    console.log('data',req.body);
    req.body.createUser = req.userId;
    const teacher = await Teacher.create(req.body);
    
    res.status(200).json({
        success: true,
        data: teacher,
    });});

exports.updateTeacher = asyncHandler(async (req, res, next) => {
    req.body.updateUser = req.userId;
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    
    if (!teacher) {
        throw new MyError(req.params.id + " ID-тэй багш байхгүй", 400);
    }
    
    res.status(200).json({
        success: true,
        data: teacher,
    });
});

exports.deleteTeacher = asyncHandler(async (req, res, next) => {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    
    if (!teacher) {
        throw new MyError(req.params.id + " ID-тэй багш байхгүй", 400);
    }
    
    res.status(200).json({
        success: true,
        data: teacher,
    });
});