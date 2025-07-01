import axios from 'axios';
import * as chai from 'chai';
import dotenv from 'dotenv';
dotenv.config();

const expect = chai.expect;

describe('POST /finance-simulation', () => {
  it('should return 200 when request is successful', async () => {
    const url = `${process.env.BASE_URL}/auto2000commercewebservices/v2/auto2000/finance-simulation`;

    const headers = {
      Authorization: process.env.CUSTOMER_TOKEN,
      'Content-Type': 'application/json',
    };

    const body = {
      car_price: 205800000,
      product_id: 'YARIS',
      OTR_price: 205800000,
      down_payment: 44660300,
      city_id: '0083',
      productDiscount: 0,
      isAddm: true,
      monthlyIncome: null,
      isPrepaidInsurance: false,
      maxAge: null,
    };

    const response = await axios.post(url, body, { headers });

    expect(response.status).to.equal(200);
  });
});
