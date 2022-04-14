class CommandResponse {
  #result;

  #events = [];

  constructor(result, events = []) {
    this.#result = result;
    this.#events = events;
  }

  get result() {
    return this.#result;
  }

  get events() {
    return this.#events;
  }

  /**
   * @param {DomainEvent} events
   * @return {CommandResponse}
   */
  static empty(...events) {
    return new CommandResponse(undefined, events);
  }

  static withResult(result, ...events) {
    return new CommandResponse(result, events);
  }
}

module.exports = {CommandResponse};