'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.category.hasMany(video, {
        foreignKey: 'category_id',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      });
      video.belongsTo(models.category, {
        foreignKey: 'category_id',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      });
      models.user.hasMany(video, {
        foreignKey: 'uploaded_by',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      });
      video.belongsTo(models.user, {
        foreignKey: 'uploaded_by',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      });
    }
  }
  video.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    uploaded_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: 'video',
    paranoid: true
  });
  return video;
};