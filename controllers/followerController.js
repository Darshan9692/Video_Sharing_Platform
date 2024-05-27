const db = require("../models");
const logger = require("../utils/pino");

//follow or unfollow users
exports.manageFollower = async (req, res, next) => {
    try {
        const followerModel = db.sequelize.models.follower;

        console.log(req.params.user_id);
        console.log(req.user.id);

        if (Number(req.params.user_id) === req.user.id) return res.json("Unable to follow");

        // Check if the user is already following the target user
        const user = await followerModel.findOne({
            where: {
                followed_by: req.user.id,
                followed_to: req.params.user_id
            }
        });

        if (user) {
            // Toggle the is_followed status
            user.is_followed = !user.is_followed;
            await user.save();

            return res.json({
                success: true,
                msg: user.is_followed ? "You followed the user" : "You unfollowed the user"
            });
        }

        // Create a new follow relationship if it doesn't exist
        const follow = await followerModel.create({
            followed_by: req.user.id,
            followed_to: req.params.user_id,
            is_followed: true // Assuming a new follow should be marked as followed
        });

        return res.json({
            success: true,
            msg: "You followed the user"
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
}

//get followers
exports.getMyFollowingsAndFollowers = async (req, res, next) => {
    try {
        const followerModel = db.sequelize.models.follower;
        const userModel = db.sequelize.models.user;

        const followersResult = await followerModel.findAndCountAll({
            where: { followed_to: req.user.id },
            include: [{
                model: userModel,
                as: 'followers',
            }]
        });

        const followingsResult = await followerModel.findAndCountAll({
            where: { followed_by: req.user.id },
            include: [{
                model: userModel,
                as: 'followings',
            }]
        });

        console.log(followingsResult);

        return res.json({
            success: true,
            followers: {
                count: followersResult.count,
                rows: followersResult.rows
            },
            followings: {
                count: followingsResult.count,
                rows: followingsResult.rows
            }
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
}

//get all users follower
exports.getUsersFollowers = async (req, res, next) => {
    try {
        const followerModel = db.sequelize.models.follower;
        const userModel = db.sequelize.models.user;

        const followersResult = await followerModel.findAndCountAll({
            where: { followed_to: req.params.id },
            include: [{
                model: userModel,
                as: 'followers',
            }]
        });

        return res.json({
            success: true,
            followers: {
                count: followersResult.count,
                rows: followersResult.rows
            }
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
}
