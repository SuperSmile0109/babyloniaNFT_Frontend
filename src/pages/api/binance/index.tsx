// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const request_string_url =
    // "https://dex.binance.org/api/v1/fees" +
    "https://api.binance.com/api/v3/ticker/price?symbol=" +
    // "wss://stream.binance.com:9443/ws/etheur@trade";
    // token_symbol +
    "CAKEUSDT";
  const response = axios.get(request_string_url, {
    headers: {
      // "Content-Type": "application/html",
      "cache-control": "no-cache",
      // Request header field cache-control is not allowed by Access-Control-Allow-Headers in preflight response.
      "Access-Control-Allow-Headers": "Content-Type",
      // "Access-Control-Allow-Origin": "*",
      // "User-Agent": "...",
      // referer: "...",
      // "Access-Control-Allow-Credentials": "true",
      // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      // "Access-Control-Allow-Headers":
      //   "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    },
  }).then((response) => {
      console.log("response = ", response);
      res.status(200).json(response.data);
    });
}
