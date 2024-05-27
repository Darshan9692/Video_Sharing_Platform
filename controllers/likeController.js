const db = require("../models");
const logger = require("../utils/pino");

//manage like and dislike
exports.manageLikes = async (req, res, next) => {
    try {

        const user = await db.sequelize.models.like.findOne({
            where: {
                liked_by: req.user.id,
                video_id: req.params.video_id
            }
        })

        if (user) {
            user.is_liked = !user.is_liked;
            await user.save();
            return res.json({
                success: true,
                msg: user.is_liked ? "You liked a video" : "You unliked a video"
            });
        }

        const like = await db.sequelize.models.like.create({
            liked_by: req.user.id,
            video_id: req.params.video_id,
            is_liked: true
        })

        return res.json({
            success: true,
            msg: "You liked a video"
        });


    } catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            msg: "Internal server error"
        })
    }
}

//count all likes of particular video
exports.getLikesOfVideo = async (req, res, next) => {
    try {

        const { count, rows } = await db.sequelize.models.like.findAndCountAll({
            where: {
                video_id: req.params.video_id
            },
            include: {
                model: db.sequelize.models.user,
            }
        })

        return res.json({
            success: true,
            count: count,
            msg: JSON.parse(JSON.stringify(rows, null, 2))
        })

    } catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            msg: "Internal server error"
        })
    }
}

exports.getMyLikedVideos = async (req, res, next) => {
    try {

        const { count, rows } = await db.sequelize.models.like.findAndCountAll({
            where: {
                liked_by: req.user.id
            },
            include: {
                model: db.sequelize.models.user,
            }
        })

        return res.json({
            success: true,
            count: count,
            msg: JSON.parse(JSON.stringify(rows, null, 2))
        })

    } catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            msg: "Internal server error"
        })
    }
}