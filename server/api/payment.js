import model from "../db/models";
import collection from "../db/collections";
import axios from "axios";
import apiKeys from "./import/apiKeys";

const payment = (user, q, body, res) => {
  // const userId = user.id;
  // const userNme = user.username
  const { userProjectId, endAt } = body;
  const payment = JSON.parse(body.payment);

  // below should be deleted
  let userId;
  let username;
  if (user && user.id) {
    userId = user.id;
    username = user.username;
  }
  if (q && q.id) {
    userId = q.id;
    username = q.username;
  } else {
    userId = 1;
    username = "Lenny";
  }

  let accessToken = "";
  const today = new Date();
  /* paymentDue is day after endAt date */
  console.log("---endAt is : ", endAt);
  let paymentDue = new Date(endAt);
  console.log("---paymentDue is : ", paymentDue);
  paymentDue.setDate(paymentDue.getDate() + 1);
  // paymentDue.setHours(18);
  console.log("---paymentDue is : ", paymentDue);
  /* convert paymentDue to 10 digit UNIX timestamp */
  paymentDue = paymentDue.valueOf().toString().slice(0, 10);
  console.log("---paymentDue is : ", paymentDue);

  /* check if all payment infos in the request */
  const { cardNumber, expiry, birth, pwd2digit, amount, currency } = payment;
  if (!(cardNumber && expiry && birth && pwd2digit && amount && currency)) {
    console.error("Error: NOT enough payment infos are passed through request");
    throw "NOT enough payment infos are passed through request";
  }
  const paymentReq = {
    params: {},
    customer_uid: userId + "-" + username, // distinctive customer uid. If customer_uid is same as before, iamport automatically process with previous card infos even if now we have sent no card infos
    checking_amount: 0, // if you want check the credit card is valid, can validate with checking_amount more then;
    card_number: cardNumber, // stirng, "xxxx-xxxx-xxxx-xxxx"
    expiry: expiry, // string, "yyyy-mm"
    birth: birth, // string, "yymmdd"
    pwd_2digit: pwd2digit, // string, "xx"
    schedules: [
      {
        "merchant_uid": userId + "-" + userProjectId + "-" + today.valueOf(), // distinctive order uid
        "schedule_at": paymentDue,  // 10 digit UNIX timestamp
        "amount": amount // integer
      }
    ]
  };

  console.log("payment in progress");
  return axios.post("https://api.iamport.kr/users/getToken", apiKeys)
  .then((answer) => {
    const data = answer.data;

    /* check if import response's code is 0 or not */
    /* If 0, it is well responsed, if not, should check message */
    if (data.code === 0) {
      console.log("Success: received access_token: ", data);
      accessToken = data.response.access_token;
      paymentReq.params._token = accessToken;
    } else {
      console.error("Error: Failed to get access_token: ", data.message);
      throw "Failed to get access_token: " + data.message;
    }
  })
  .then(() => {
    if (accessToken.length === 0) {
      console.error("Failed to store access_token on the server");
      throw "Failed to store access_token on the server";
    }
    console.log("paymentInfo is ", paymentReq);
    return axios.post("https://api.iamport.kr/subscribe/payments/schedule?_token=" + accessToken, paymentReq)
    .then((answer) => answer);
  })
  .then((answer) => {
    const data = answer.data;
    if (data.code === 0) {
      console.log("Success: scheduled transaction: ", data);
      /* If res === null or res === undefined, just return data */
      if (!res) {
        console.log("Method use: Return createNewProject Result: ", data);
        return data;
      } else {
        res.status(200).send(data);
      }
    } else {
      console.error("Error: Failed to schedule transaction: ", data);
      throw "Failed to schedule transaction: " + data.message;
    }
  })
  .catch((err) => {
    console.error("Error: Failed in transaction in 'payment.js': ", err);

    /* If res === null or res === undefined, just return err */
    if (!res) {
      throw "Failed in transaction in 'payment.js': " + err;
    } else {
      res.status(500).end();
      throw "Failed in transaction in 'payment.js': " + err;
    }
  });
};

export default payment;
