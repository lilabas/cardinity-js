module.exports = class Card {
  // constructor() {}

  get pan() {
    return this._pan;
  }

  get cvc() {
    return this._cvc;
  }

  get year() {
    return this._year;
  }

  get month() {
    return this._month;
  }

  get holder() {
    return this._holder;
  }

  setPan(pan) {
    this._pan = pan;
  }

  setCvc(cvc) {
    this._cvc = cvc;
  }

  setExpYear(year) {
    this._year = year;
  }

  setExpMonth(month) {
    this._month = month;
  }

  setHolder(holder) {
    this._holder = holder;
  }
};
