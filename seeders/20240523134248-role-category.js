'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [{
      role: 'User'
    }, {
      role: 'Admin'
    }], {});
    await queryInterface.bulkInsert('categories', [
      {
        category: 'Entertainment'
      },
      {
        category: 'Current Affairs'
      },
      {
        category: 'Education'
      },
      {
        category: 'Technology'
      },
      {
        category: 'Health & Fitness'
      },
      {
        category: 'Music'
      },
      {
        category: 'Sports'
      },
      {
        category: 'Travel'
      },
      {
        category: 'Food & Cooking'
      },
      {
        category: 'Lifestyle'
      },
      {
        category: 'Gaming'
      },
      {
        category: 'Comedy'
      },
      {
        category: 'News'
      },
      {
        category: 'Documentary'
      },
      {
        category: 'Animation'
      },
      {
        category: 'DIY & Crafts'
      },
      {
        category: 'Science & Nature'
      },
      {
        category: 'Fashion & Beauty'
      },
      {
        category: 'Motivation & Inspiration'
      },
      {
        category: 'Vlogs'
      }
    ], {});
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  }
};
