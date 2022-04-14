const {QueryHandler} = require('../../../src/query/queryHandler');

class GetUserQueryHandler extends QueryHandler {
  /** @type {UserRepository} */
  userRepository;

  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }

  /**
   * @param {GetUserQuery} query
   * @return {Promise<User>}
   */
  async handle(query) {
    const user = await this.userRepository.findById(query.userId);

    if (!user) {
      throw new Error('user not exists');
    }

    return user;
  }
}

module.exports = {GetUserQueryHandler};