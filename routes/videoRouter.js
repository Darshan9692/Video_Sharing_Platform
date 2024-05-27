const express = require("express");
const router = express.Router();
const multer = require("multer");
const { videoFilter, videoStorage } = require("../utils/multer");
const { uploadVideo, getAllVideos, getMyVideos, getSingleVideo, deleteVideo, getCategoryVideos, updateVideo } = require("../controllers/videoController");
const passport = require("passport");
const videoUpload = multer({ storage: videoStorage, fileFilter: videoFilter });

router.use(passport.authenticate("jwt", { session: false, failureRedirect: "/login" }));

router.route("/").get(getMyVideos).post(videoUpload.single("video"), uploadVideo);
router.route("/category/:cat_id").get(getCategoryVideos);
router.route("/:video_id").get(getSingleVideo).delete(deleteVideo).put(videoUpload.single("video"),updateVideo);
router.route("/get/all").get(getAllVideos);

module.exports = router;