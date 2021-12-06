const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
    getRooms, 
    getRoom, 
    createRoom, 
    updateRoom, 
    deleteRoom, 
} = require("../controller/rooms");

const router = express.Router();

//"api/v1/rooms"
router.route('/').get(getRooms).post(protect, authorize("admin"), createRoom);

router
.route("/:id")
.get(getRoom)
.put(protect, authorize("admin", "operator"), updateRoom)
.delete(protect,authorize("admin"), deleteRoom);

module.exports = router;