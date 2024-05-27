const express = require("express");
const router = express.Router();
const auth = require("../routes/authRouter");
const video = require("../routes/videoRouter");
const follower = require("../routes/followerRouter");
const like = require("../routes/likeRouter");
const comment = require("../routes/commentRouter");

router.use("/", auth);
router.use("/video", video);
router.use("/follower", follower);
router.use("/like", like);
router.use("/comment", comment);

module.exports = router;