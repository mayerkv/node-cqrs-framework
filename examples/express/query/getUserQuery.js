const {Query} = require('../../../src/query/query');

class GetUserQuery extends Query {
  userId;


  constructor(userId) {
    super();

    this.userId = userId;
  }
}

module.exports = {GetUserQuery};