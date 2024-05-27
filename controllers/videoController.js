const { where } = require("sequelize");
const db = require("../models");
const logger = require("../utils/pino");

//upload videos
exports.uploadVideo = async (req, res, next) => {
    try {

        const nullValues = Object.keys(req.body).filter((e) => { return !req.body[e] });

        if (nullValues.length > 0) return res.json(`Please fill this values : ${nullValues.join(",")}`);

        if (!req.file) return res.json("please upload a video");

        try {

            const video = await db.sequelize.models.video.create({
                ...req.body,
                uploaded_by: req.user.id,
                url: req.file.filename
            })

            return res.json({
                success: true,
                msg: video.dataValues
            })

        } catch (error) {
            logger.error(error);
            return res.json({
                success: false,
                msg: "Unable to upload video"
            })
        }

    } catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            msg: "Internal server error"
        })
    }
}

//update videos
exports.updateVideo = async (req, res, next) => {
    try {

        const video = await db.sequelize.models.video.findOne({
            where: {
                id: req.params.video_id,
                uploaded_by: req.user.id
            }
        })

        if (!video) return res.json("unable to update video");

        if (req.file) video.url = req.file.filename;

        Object.keys(req.body).forEach(async (key) => {
            video[key] = req.body[key];
        })

        await video.save();

        return res.json({
            success: true,
            msg: JSON.parse(JSON.stringify(video, null, 2))
        })

    } catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            msg: "Internal server error"
        })
    }
}

//get my videos
exports.getMyVideos = async (req, res, next) => {
    try {

        const { count, rows } = await db.sequelize.models.video.findAndCountAll({ where: { uploaded_by: req.user.id }, include: db.sequelize.models.user });

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

//get all videos
exports.getAllVideos = async (req, res, next) => {
    try {

        const { count, rows } = await db.sequelize.models.video.findAndCountAll({
            include: db.sequelize.models.user
        });

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

//get single video
exports.getSingleVideo = async (req, res, next) => {
    try {

        const video = await db.sequelize.models.video.findOne({ where: { id: req.params.video_id }, include: db.sequelize.models.user });

        return res.json({
            success: true,
            msg: JSON.parse(JSON.stringify(video, null, 2))
        })

    } catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            msg: "Internal server error"
        })
    }
}

//get particular category videos
exports.getCategoryVideos = async (req, res, next) => {
    try {

        const { count, rows } = await db.sequelize.models.video.findAndCountAll({
            where: {
                category_id: req.params.cat_id
            },
            include: db.sequelize.models.user
        });

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

//delete video
exports.deleteVideo = async (req, res, next) => {
    try {

        const deleteVideo = await db.sequelize.models.video.destroy({
            where: {
                id: req.params.video_id,
                uploaded_by: req.user.id,
                deletedAt: null
            }
        })

        if (deleteVideo === 0) return res.json("unable to delete video");

        return res.json({
            success: true,
            msg: "video deleted successfully"
        })

    } catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            msg: "Internal server error"
        })
    }
}