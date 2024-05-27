const db = require("../models");
const logger = require("../utils/pino");

// post comment
exports.sendComment = async (req, res, next) => {
    try {

        if (!req.body.comment) return res.json("Please add a comment");

        const user = await db.sequelize.models.comment.findOne({
            where: {
                commented_by: req.user.id,
                video_id: req.params.video_id
            }
        })

        if (user) return res.json("Already added comment");

        const comment = await db.sequelize.models.comment.create({
            video_id: req.params.video_id,
            comment: req.body.comment,
            commented_by: req.user.id
        })

        return res.json({
            success: true,
            msg: comment.dataValues
        })

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
}

// get all comment
exports.getComments = async (req, res, next) => {
    try {

        const { count, rows } = await db.sequelize.models.comment.findAndCountAll({
            where: {
                video_id: req.params.video_id
            },
            include: db.sequelize.models.user
        })

        return res.json({
            success: true,
            count: count,
            msg: JSON.parse(JSON.stringify(rows, null, 2))
        })

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
}

//update comment
exports.updateComment = async (req, res, next) => {
    try {
        if (!req.body.comment) {
            return res.status(400).json({ msg: "Please add a comment" });
        }

        const [updated] = await db.sequelize.models.comment.update(
            { comment: req.body.comment },
            {
                where: {
                    video_id: req.params.video_id,
                    commented_by: req.user.id
                }
            }
        );

        if (updated) {
            const updatedComment = await db.sequelize.models.comment.findOne({ 
                where: {
                    video_id: req.params.video_id,
                    commented_by: req.user.id
                }
            });
            return res.json({
                success: true,
                msg: updatedComment
            });
        }

        return res.status(404).json({
            success: false,
            msg: "Comment not found or user not authorized"
        });
        
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};
