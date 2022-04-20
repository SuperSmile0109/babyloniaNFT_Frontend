// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {
    query: { symbol },
    method,
  } = req;
  if (symbol === "BABY" || symbol === "KTKT" || symbol === "BTCB") {
    res.status(200).json(0);
    return;
  } else if (symbol === "USDT") {
    res.status(200).json(1);
    return;
  }

  const request_string_url =
    // "https://dex.binance.org/api/v1/fees" +
    "https://api.binance.com/api/v3/ticker/price?symbol=" +
    // "wss://stream.binance.com:9443/ws/etheur@trade";
    symbol +
    "USDT";
  const response = axios
    .get(request_string_url, {
      headers: {
        "cache-control": "no-cache",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
    .then((response) => {
      console.log("fantom service response = ", response.data.price);
      res.status(200).json(response.data.price);
    });
  console.log("response fantom service = ", response);
}
