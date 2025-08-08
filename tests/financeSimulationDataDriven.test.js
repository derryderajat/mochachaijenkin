import axios from "axios";
import * as chai from "chai";
import { step, attachment } from "allure-js-commons";
import dataProductID from "../data/financialSimulation/product_id.json" assert { type: "json" };
import dataOtr from "../data/financialSimulation/otr_price.json" assert { type: "json" };
import setterCustomerToken from "../helper/auth.js";
const expect = chai.expect;

const url = `${process.env.BASE_URL}/auto2000commercewebservices/v2/auto2000/finance-simulation`;

describe("POST /finance-simulation", () => {
  let token;
  before(async () => {
    token = await setterCustomerToken();
  });
  describe("Validate Payload", () => {
    describe("Validate product_id", () => {
      dataProductID.forEach((data) => {
        it(data.summary, async () => {
          const headers = {
            Authorization: token,
            "Content-Type": "application/json",
          };

          await step("Prepare Request", async () => {
            await attachment(
              "Request Body",
              JSON.stringify(data.body, null, 2),
              "application/json"
            );
            await attachment(
              "Expected Status",
              `${data.expectedStatus}`,
              "text/plain"
            );
          });

          try {
            const response = await axios.post(url, data.body, { headers });

            await step("Response Received", async () => {
              await attachment(
                "Response Body",
                JSON.stringify(response.data, null, 2),
                "application/json"
              );
              await attachment(
                "Status Code",
                `${response.status}`,
                "text/plain"
              );
            });

            expect(response.status).to.equal(data.expectedStatus);
          } catch (error) {
            if (error.response) {
              console.log(error.message);
              await step("Error Response Received", async () => {
                await attachment(
                  "Error Body",
                  JSON.stringify(error.response.data, null, 2),
                  "application/json"
                );
                await attachment(
                  "Error Status",
                  `${error.response.status}`,
                  "text/plain"
                );
              });
              expect(error.response.status).to.equal(data.expectedStatus);
            } else {
              throw error;
            }
          }
        });
      });
    });

    describe("Validate OTR Price", () => {
      dataOtr.forEach((data) => {
        it(data.summary, async () => {
          const headers = {
            Authorization: token,
            "Content-Type": "application/json",
          };

          await step("Prepare Request", async () => {
            await attachment(
              "Request Body",
              JSON.stringify(data.body, null, 2),
              "application/json"
            );
            await attachment(
              "Expected Status",
              `${data.expectedStatus}`,
              "text/plain"
            );
          });

          try {
            const response = await axios.post(url, data.body, {
              headers,
            });
            await step("Response Received", async () => {
              await attachment(
                "Response Body",
                JSON.stringify(response.data, null, 2),
                "application/json"
              );
              await attachment(
                "Status Code",
                `${response.status}`,
                "text/plain"
              );
            });
            expect(response.status).to.equal(data.expectedStatus);
          } catch (error) {
            if (error.response) {
              console.log(error.message);
              await step("Error Response Received", async () => {
                await attachment(
                  "Error Body",
                  JSON.stringify(error.response.data, null, 2),
                  "application/json"
                );
                await attachment(
                  "Error Status",
                  `${error.response.status}`,
                  "text/plain"
                );
              });
              expect(error.response.status).to.equal(data.expectedStatus);
            } else {
              throw error;
            }
          }
        });
      });
    });
  });
});
