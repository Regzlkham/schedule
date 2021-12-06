const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
    getTeachers, 
    getTeacher, 
    createTeacher, 
    updateTeacher, 
    deleteTeacher, 
} = require("../controller/teachers");

const router = express.Router();

//"api/v1/teachers"
router.route('/').get(getTeachers).post(protect, authorize("admin"), createTeacher);

router
.route("/:id")
.get(getTeacher)
.put(protect, authorize("admin", "operator"), updateTeacher)
.delete(protect, authorize("admin"), deleteTeacher);

module.exports = router;