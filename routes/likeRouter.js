const express = require("express");
const { manageLikes, getLikesOfVideo, getMyLikedVideos } = require("../controllers/likeController");
const passport = require("passport");
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false, failureRedirect: "/login" }));

router.route("/:video_id").get(getLikesOfVideo).post(manageLikes);
router.route("/get/mine").get(getMyLikedVideos);

module.exports = router;