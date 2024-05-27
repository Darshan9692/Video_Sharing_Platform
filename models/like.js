'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasMany(like, {
        foreignKey: 'liked_by',
        onDelete:'SET NULL',
        onUpdate:'SET NULL'
      })
      like.belongsTo(models.user, {
        foreignKey: 'liked_by',
        onDelete:'SET NULL',
        onUpdate:'SET NULL'
      })
      models.video.hasMany(like, {
        foreignKey: 'video_id',
        onDelete:'SET NULL',
        onUpdate:'SET NULL'
      })
      like.belongsTo(models.video, {
        foreignKey: 'video_id',
        onDelete:'SET NULL',
        onUpdate:'SET NULL'
      })
    }
  }
  like.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    liked_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    video_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'videos',
        key: 'id'
      }
    },
    is_liked: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdAt: {
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'like',
  });
  return like;
};