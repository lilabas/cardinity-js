# cardinity-js

Node.JS wrapper for Cardinity API

## Install

```
$ npm install --save cardinity-js
```

## Usage

```js
const cardinity = require('cardinity-js');
const CardinityClient = cardinity.client();
const Payment = cardinity.payment();
const Card = cardinity.card();
const Recurring = cardinity.recurring();

const makePayment = async () => {
  const client = new CardinityClient(
    <your_key>,
    <your_secret>
  );

  const payment = new Payment();
  payment.setAmount('4.99');
  payment.setCurrency('EUR');
  payment.setCountry('DE');
  payment.setPaymentMethod(payment.Method.CARD);
  const card = new Card();
  card.setPan('4111111111111111');
  card.setCvc('123');
  card.setExpYear(2021);
  card.setExpMonth(1);
  card.setHolder('John Doe');
  payment.setPaymentInstrument(card);

  const paymentResult = await client.createPayment(payment);
  if (paymentResult.isValid && paymentResult.item.status === 'approved') {
    console.log('payment with id :', paymentResult.item.id, 'is approved!');
  } else {
    console.log(paymentResult.error);
  }
};

makePayment();
```

## License

MIT © Li Labas
