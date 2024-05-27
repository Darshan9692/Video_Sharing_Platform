const express = require("express");
const passport = require("passport");
const { sendComment, getComments, updateComment } = require("../controllers/commentController");
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false, failureRedirect: "/login" }));

router.route("/:video_id").get(getComments).post(sendComment).put(updateComment).delete();



module.exports = router;