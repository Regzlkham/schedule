const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
    getHuviars,
    deleteHuviar,
    updateHuviar,
    createHuviar
} = require("../controller/huviar");

const router = express.Router();

//"api/v1/rooms"
router.route('/').get(getHuviars).post(protect, authorize("admin"), createHuviar);

router
.route("/:id")
.put(protect, authorize("admin", "operator"), updateHuviar)
.delete(protect,authorize("admin"), deleteHuviar);

module.exports = router;