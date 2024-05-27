'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.video.hasMany(comment, {
        foreignKey: 'video_id',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      });
      comment.belongsTo(models.video, {
        foreignKey: 'video_id',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      });
      models.user.hasMany(comment,{
        foreignKey: 'commented_by',
        onDelete:'SET NULL',
        onUpdate:'SET NULL'
      })
      comment.belongsTo(models.user,{
        foreignKey: 'commented_by',
        onDelete:'SET NULL',
        onUpdate:'SET NULL'
      })
    }
  }
  comment.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    video_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'videos',
        key: 'id'
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    commented_by: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: {
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'comment',
    paranoid: true
  });
  return comment;
};