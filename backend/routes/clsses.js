const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
    getClsses, 
    getClss, 
    createClss, 
    updateClss, 
    deleteClss, 
} = require("../controller/clsses");

const router = express.Router();

//"api/v1/teachers"
router.route('/').get(getClsses).post(protect,authorize("admin"), createClss);

router
.route("/:id")
.get(getClss)
.put(protect, authorize("admin", "operator"), updateClss)
.delete(protect, authorize("admin"), deleteClss);

module.exports = router;