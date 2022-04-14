const {UserRepository} = require('../domain/userRepository');

class InMemoryUserRepository extends UserRepository {
  users = new Map();

  constructor(users = new Map()) {
    super();

    this.users = users;
  }

  findById(id) {
    const user = this.users.get(id) || null;

    return Promise.resolve(user);
  }

  save(user) {
    this.users.set(user.id, user);

    return Promise.resolve();
  }
}

module.exports = {InMemoryUserRepository};