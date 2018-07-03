module.exports = class PaymentResult {
  parseValidData() {
    this.parsedData.id = this.raw.id;
    this.parsedData.type = this.raw.type;
    this.parsedData.created = this.raw.created;
    this.parsedData.status = this.raw.status;
    if (this.parsedData.status === 'declined') this.parsedData.error = this.raw.error;
  }

  parseList() {
    const item = {};
    this.raw.forEach((dataItem) => {
      item.id = dataItem.id;
      item.type = dataItem.type;
      item.created = dataItem.created;
      item.status = dataItem.status;
      if (item.status === 'declined') item.error = dataItem.error;
      this.parsedList.push(item);
    });
  }

  constructor(valid, data, list = false) {
    this._isValid = valid;
    this.raw = data;
    this.parsedData = {};
    this.parsedList = [];
    if (list) {
      this.parseList();
    } else if (valid) {
      this.parseValidData();
    }
  }

  get isValid() {
    return this._isValid;
  }

  get item() {
    return this.parsedData;
  }

  get list() {
    return this.parsedList;
  }
};
