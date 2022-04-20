import AxiosInstance from "../../helpers/axios";
import { PoolTokenListForPolygon } from "../../constants/Tokens";

const API_KEY = "DBID9B9I4BZITZ1SDE54V5U2JQJR2S3C5W";

interface IChainIds {
  id: string;
  url: string;
}

const PolygonChainIds: any = {
  137: "https://api.polygonscan.com/api",
  80001: "https://api-testnet.polygonscan.com/api",
};

const get_matic_price = (chainId: string) => {
  const request_string_url =
    PolygonChainIds[chainId] +
    "?module=stats&action=maticprice" +
    "&apikey=" +
    API_KEY;
  return AxiosInstance.get(request_string_url);
};

//function : get_token_from_bscscan
//input : token_symbol
//output : token_info
const get_token_price_from_polygon = (token_symbol: string) => {
  const Backend_baseUrl = process.env.REACT_APP_POOL_BACKEND_URL;
  if (token_symbol === "WBTC") token_symbol = "BTC";
  if (token_symbol === "WETH") token_symbol = "ETH";
  console.log("get_token_price_from_polygon = ", token_symbol);
  const request_string_url =
    // "https://dex.binance.org/api/v1/fees" +
    //"https://api.binance.com/api/v3/ticker/price?symbol=" +
    // "wss://stream.binance.com:9443/ws/etheur@trade";
    `${Backend_baseUrl}get_token_price_from_polygon?symbol=${token_symbol}`;

  return AxiosInstance.get(request_string_url, {
    headers: {
      "cache-control": "no-cache",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

const get_tokens_balances_from_polygon = async (
  wallet_address: string,
  chainId: string
) => {
  var tokens: any = [];
  // wallet_address = "0x63d62E6CB2aA4de4E3c7E59D188480C7f13d8be5";

  let i = 0;
  let polygon_price1 = await get_matic_price(chainId);
  console.log("polygon_price1 = ", polygon_price1);
  let polygon_price = await polygon_price1.data.result.maticusd;
  // console.log("polygon_price=", polygon_price);
  while (i < PoolTokenListForPolygon.length) {
    let request_string_url =
      PolygonChainIds[chainId] +
      "?module=account&action=tokenbalance&address=" +
      wallet_address +
      "&contractaddress=" +
      PoolTokenListForPolygon[i].contract +
      "&apikey=" +
      API_KEY;
    let TokenItem = PoolTokenListForPolygon[i];
    let token = await AxiosInstance.get(request_string_url);
    setTimeout(() => {
      // console.log("count =", i);
    }, 240);
    console.log("polllll  token = ", token);
    let balance = 0;
    let polygon_balance_in_usd = 0;
    // console.log(token.data);
    if (token.data.status === "1") {
      balance = parseFloat(token.data.result) / 10 ** TokenItem.decimals;
      // # polygon_balance_in_usd = float(balance) * (float(get_matic_price(request)) / 1e18)
      polygon_balance_in_usd = balance * parseFloat(polygon_price);
    } else {
      balance = 0;
      polygon_balance_in_usd = 0;
    }
    let price = { data: 0 };
    try {
      price = await get_token_price_from_polygon(TokenItem.symbol);
    } catch (e) {
      console.log("error in get_token_price_from_polygon = ", e);
    }

    console.log("price = ", price.data);
    if (!price.data) {
      price = { ...price, data: 0 };
    }
    let usd_balance = 1 * price.data * balance;
    if (TokenItem.symbol === "MATIC" || balance !== 0)
      tokens.push({
        symbol: TokenItem.symbol,
        price: price.data,
        // price: 1,

        contract: TokenItem.contract,
        balance: balance,
        usd_balance: usd_balance,
        // usd_balance: 0.1,
        polygon_price: polygon_price,
        // icon: get_token_logo(TokenItem.symbol),
        icon: TokenItem.icon,
        type: TokenItem.type,
        decimals: TokenItem.decimals,
      });
    i++;
  }
  console.log("***********=======)))>>>>", tokens);
  // tokens =tokens+tokens;
  return tokens;
};

export default get_tokens_balances_from_polygon;
