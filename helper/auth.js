import axios from "axios";
async function setterCustomerToken() {
  try {
    const url = `${process.env.BASE_URL}/auto2000commercewebservices/v2/auto2000/auto2kUserToken`;

const payload = {
  otpCode: process.env.OTP_CODE,
  otpType: process.env.OTP_TYPE,
  phoneNumber: process.env.PHONE_NUMBER,
  encryptedPassword: process.env.ENCRYPTED_PASSWORD,
};
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'isUserLoggedIn': 'false'
      },
    });
    const token = response.data.access_token;
    const bearerToken = `Bearer ${token}`;
    return bearerToken;
  } catch (error) {
    console.error(
      "Failed to update token:",
      error.response?.data || error.message
    );
    throw error;
  }
}


export default setterCustomerToken
