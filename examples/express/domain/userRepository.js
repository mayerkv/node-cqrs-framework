/* eslint-disable no-unused-vars */

/**
 * @interface
 */
class UserRepository {
  /**
   * @param {string} id
   * @return {Promise<User|null>}}
   */
  findById(id) {
    throw new Error('must be implemented');
  }


  /**
   * @param {User} user
   * @return {Promise<void>}
   */
  save(user) {
    throw new Error('must be implemented');
  }
}

module.exports = {UserRepository};