import AxiosInstance from "../../helpers/axios";
import { PoolTokenList } from "../../constants/Tokens";

const API_KEY = "27HQEZQ7FUXC46A7W1KK4Y21QMP21IRK4S";
const url_eth = "https://api-testnet.bscscan.com/api";

interface IChainIds {
  id: string;
  url: string;
}

const bnbChainIds: any = {
  56: "https://api.bscscan.com/api",
  97: "https://api-testnet.bscscan.com/api",
};

const get_bnb_price = (chainId: string) => {
  const request_string_url =
    bnbChainIds[chainId] +
    "?module=stats&action=bnbprice" +
    "&apikey=" +
    API_KEY;
  return AxiosInstance.get(request_string_url);
};

//function : get_token_from_bscscan
//input : token_symbol
//output : token_info
const get_token_price_from_binance = (token_symbol: string) => {
  const Backend_baseUrl = process.env.REACT_APP_POOL_BACKEND_URL;

  console.log("get_token_price_from_binance = ", token_symbol);
  const request_string_url =
    // "https://dex.binance.org/api/v1/fees" +
    //"https://api.binance.com/api/v3/ticker/price?symbol=" +
    // "wss://stream.binance.com:9443/ws/etheur@trade";
    `${Backend_baseUrl}get_token_price_from_binance?symbol=${token_symbol}`;
  return AxiosInstance.get(request_string_url, {
    headers: {
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const get_tokens_balances_from_binance = async (
  wallet_address: string,
  chainId: string
) => {
  var tokens: any = [];

  let i = 0;
  let bnb_price1 = await get_bnb_price(chainId);
  let bnb_price = await bnb_price1.data.result.ethusd;
  // console.log("bnb_price=", bnb_price);
  while (i < PoolTokenList.length) {
    let request_string_url =
      bnbChainIds[chainId] +
      "?module=account&action=tokenbalance&address=" +
      wallet_address +
      "&contractaddress=" +
      PoolTokenList[i].contract +
      "&apikey=" +
      API_KEY;
    let TokenItem = PoolTokenList[i];
    let token = await AxiosInstance.get(request_string_url);
    setTimeout(() => {
      // console.log("count =", i);
    }, 240);
    console.log("token = ", token);
    let balance = 0;
    let bnb_balance_in_usd = 0;
    // console.log(token.data);
    if (token.data.status === "1") {
      balance = parseFloat(token.data.result) / 10 ** TokenItem.decimals;
      // # bnb_balance_in_usd = float(balance) * (float(get_bnb_price(request)) / 1e18)
      bnb_balance_in_usd = balance * parseFloat(bnb_price);
    } else {
      balance = 0;
      bnb_balance_in_usd = 0;
    }
    let price = await get_token_price_from_binance(TokenItem.symbol);
    console.log("price = ", price.data);
    if (
      TokenItem.symbol === "BABY" ||
      TokenItem.symbol === "BNB" ||
      balance !== 0
    )
      tokens.push({
        symbol: TokenItem.symbol,
        price: price.data,
        contract: TokenItem.contract,
        balance: balance,
        usd_balance: price.data * balance,
        bnb_price: bnb_price,
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

// https://api.polygonscan.com/api?module=account&action=balance&address=0x5A534988535cf27a70e74dFfe299D06486f185B7&apikey=DBID9B9I4BZITZ1SDE54V5U2JQJR2S3C5W
const polygonChainIds: any = {
  56: "https://api.bscscan.com/api",
  97: "https://api-testnet.bscscan.com/api",
};

export default get_tokens_balances_from_binance;
