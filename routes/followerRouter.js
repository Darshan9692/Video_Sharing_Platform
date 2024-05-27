const express = require("express");
const passport = require("passport");
const { manageFollower, getMyFollowingsAndFollowers, getUsersFollowers } = require("../controllers/followerController");
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false, failureRedirect: "/login" }));

router.route("/").get(getMyFollowingsAndFollowers);
router.route("/:user_id").post(manageFollower);
router.route("/count/:id").get(getUsersFollowers);

module.exports = router;