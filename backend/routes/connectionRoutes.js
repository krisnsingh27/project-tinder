const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
    sendRequest,
    acceptRequest,
    rejectRequest,
    ignoreUser,
    getConnections,getReceivedRequests

} = require("../controllers/connectionController");

router.post("/request/:id", auth, sendRequest);
router.put("/accept/:id", auth, acceptRequest);
router.put("/reject/:id", auth, rejectRequest);
router.put("/ignore/:id", auth, ignoreUser);



router.get("/friends", auth, getConnections);
router.get("/requests/received", auth, getReceivedRequests);

module.exports = router;

