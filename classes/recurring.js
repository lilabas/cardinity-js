module.exports = class Recurring {
  get id() {
    return this._id;
  }

  setPaymentId(id) {
    this._id = id;
  }
};
