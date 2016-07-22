import model from "../db/models";
import collection from "../db/collections";
import axios from "axios";
import apiKeys from "./import/apiKeys";

/* Send payment cancel request to Iamport and update transaction in 'transactin' table */
/* Post Data: customer_uid, merchant_uid */

const paymentCancel = (user, q, body, res) => {
  const userId = user.id;
  const username = user.username;

  // Test code below
  // let userId;
  // let username;
  // if (user && user.id) {
  //   userId = user.id;
  //   username = user.username;
  // }
  // if (q && q.id) {
  //   userId = q.id;
  //   username = q.username;
  // } else {
  //   userId = 1;
  //   username = "Lenny";
  // }

  const { customer_uid, merchant_uid } = body;

  let accessToken = "";

  const paymentCancelReq = {
    params: {},
    customer_uid: customer_uid,
    merchant_uid: [merchant_uid]
  };

  return axios.post("https://api.iamport.kr/users/getToken", apiKeys)
  .then((answer) => {
    const data = answer.data;

    /* check if import response's code is 0 or not */
    /* If 0, it is well responsed, if not, should check message */
    if (data.code === 0) {
      console.log("Success: received access_token: ", data);
      accessToken = data.response.access_token;
      paymentCancelReq.params._token = accessToken;
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
    console.log("paymentCancelInfo is ", paymentCancelReq);
    return axios.post("https://api.iamport.kr/subscribe/payments/unschedule?_token=" + accessToken, paymentCancelReq)
    .then((answer) => answer);
  })
  .then((answer) => {
    const data = answer.data;
    if (data.code === 0) {
      console.log("Success: unscheduled transaction: ", data);
      /* Return data, if res === null or res === undefined */
      if (!res) {
        console.log("Method use: Return record Result: ", data);
        return data;
      } else {
        res.status(200).send(data);
      }
    } else {
      console.error("Error: Failed to unschedule transaction: ", data);
      throw "Failed to unschedule transaction: " + data.message;
    }
  })
  .catch((err) => {
    console.error("Error: Failed in canceling transaction in 'paymentCancel.js': ", err);

    /* Return err, if res === null or res === undefined */
    if (!res) {
      throw "Failed in canceling transaction in 'paymentCancel.js': " + err;
    } else {
      res.status(500).end();
      throw "Failed in canceling transaction in 'paymentCancel.js': " + err;
    }
  });
};

export default paymentCancel;
