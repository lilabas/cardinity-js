module.exports = class Payment {
  constructor() {
    this.method = {
      CARD: 'card',
      RECURRING: 'recurring',
    };
  }

  get Method() {
    return this.method;
  }

  get amount() {
    return this._amount;
  }

  get currency() {
    return this._currency;
  }

  get country() {
    return this._country;
  }

  get paymethod() {
    return this._paymethod;
  }

  get payinstrument() {
    if (this._paymethod === 'card') {
      return {
        pan: this._payinstrument.pan,
        exp_year: this._payinstrument.year,
        exp_month: this._payinstrument.month,
        cvc: this._payinstrument.cvc,
        holder: this._payinstrument.holder,
      };
    }
    if (this._paymethod === 'recurring') {
      return {
        payment_id: this._payinstrument.id,
      };
    }

    return {};
  }

  setAmount(amount) {
    this._amount = amount;
  }

  setCurrency(currency) {
    this._currency = currency;
  }

  setCountry(country) {
    this._country = country;
  }

  setPaymentMethod(paymethod) {
    this._paymethod = paymethod;
  }

  setPaymentInstrument(payinstrument) {
    this._payinstrument = payinstrument;
  }
};
