'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
    */
   static associate(models) {
      models.user.hasMany(follower, {
        foreignKey: 'followed_to',
        as:"followings",
        onDelete:'SET NULL',
        onUpdate:'SET NULL'
      });
      follower.belongsTo(models.user, {
        foreignKey: 'followed_to',
        as:"followings",
        onDelete:'SET NULL',
        onUpdate:'SET NULL'
      })
      models.user.hasMany(follower, {
        foreignKey: 'followed_by',
        as:"followers",
        onDelete:'SET NULL',
        onUpdate:'SET NULL'
      });
      follower.belongsTo(models.user, {
        foreignKey: 'followed_by',
        as:"followers",
        onDelete:'SET NULL',
        onUpdate:'SET NULL'
      })
    }
  }
  follower.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    followed_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    followed_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    is_followed: {
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
    modelName: 'follower',
  });
  return follower;
};