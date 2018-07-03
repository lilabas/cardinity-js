const uniqueString = require('unique-string');
const oauthSignature = require('oauth-signature');
const axios = require('axios');
const PaymentResult = require('./paymentresult');
/* const OAuth = require('oauth-1.0a');
const crypto = require('crypto'); */

module.exports = class CardinityClient {
  constructor(key, secret) {
    this.key = key;
    this.secret = secret;
    this.baseURL = 'https://api.cardinity.com/v1/';
  }

  createSignature(url, timestamp, nonce, method) {
    const httpMethod = method;
    const parameters = {
      oauth_consumer_key: this.key,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: timestamp,
      oauth_nonce: nonce,
      oauth_version: '1.0',
    };
    return oauthSignature.generate(httpMethod, url, parameters, this.secret);
  }

  createHeader(url, method) {
    const timestamp = Date.now();
    const nonce = uniqueString();
    const signature = this.createSignature(url, timestamp, nonce, method);
    return {
      'Content-Type': 'application/json',
      Authorization: `OAuth oauth_consumer_key="${
        this.key
      }",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${timestamp}",oauth_nonce="${nonce}",oauth_version="1.0",oauth_signature="${signature}"`,
    };
  }

  createRequestObjectForNewPayment(endpoint, payment) {
    return {
      method: 'post',
      url: this.baseURL + endpoint,
      data: {
        amount: payment.amount,
        currency: payment.currency,
        country: payment.country,
        payment_method: payment.paymethod,
        payment_instrument: payment.payinstrument,
      },
      headers: this.createHeader(this.baseURL + endpoint, 'POST'),
    };
  }

  createRequestObjectForGetPayment(endpoint, id) {
    return {
      method: 'get',
      url: `${this.baseURL + endpoint}/${id}`,
      headers: this.createHeader(`${this.baseURL + endpoint}/${id}`, 'GET'),
    };
  }

  createRequestObjectForGetPaymentList(endpoint) {
    return {
      method: 'get',
      url: this.baseURL + endpoint,
      headers: this.createHeader(this.baseURL + endpoint, 'GET'),
    };
  }

  async createPayment(payment) {
    const reqObject = this.createRequestObjectForNewPayment('payments', payment);
    try {
      const response = await axios(reqObject);
      const paymentResult = new PaymentResult(true, response.data);
      return paymentResult;
    } catch (err) {
      const paymentResult = new PaymentResult(false, err.response.data);
      return paymentResult;
    }
  }

  async getPayment(id) {
    const reqObject = this.createRequestObjectForGetPayment('payments', id);
    try {
      const response = await axios(reqObject);
      const paymentResult = new PaymentResult(true, response.data);
      return paymentResult;
    } catch (err) {
      const paymentResult = new PaymentResult(false, err.response.data);
      return paymentResult;
    }
  }

  async getPayments() {
    const reqObject = this.createRequestObjectForGetPaymentList('payments');
    try {
      const response = await axios(reqObject);
      const paymentResult = new PaymentResult(true, response.data, true);
      return paymentResult;
    } catch (err) {
      const paymentResult = new PaymentResult(false, err.response.data, true);
      return paymentResult;
    }
  }
};
