class User {
  id;

  name;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static create(name) {
    return new User(User.generateId(), name);
  }

  static generateId() {
    return new Date().getTime().toString();
  }
}

module.exports = {User};