import AxiosInstance from "../../helpers/axios";
import { PoolTokenListForFantom } from "../../constants/Tokens";
//raiden key
const API_KEY = "8U5KQNSDU6HE44XMV7SGD9UP6IKA7I7887";

interface IChainIds {
  id: string;
  url: string;
}

const FantomChainAddresses: any = {
  250: "https://api.ftmscan.com/api",
  4002: "https://api.ftmscan.com/api",
};

const get_fantom_price = (chainId: string) => {
  const request_string_url =
    // FantomChainAddresses[chainId] +
    "https://api.binance.com/api/v3/ticker/price?symbol=FTMUSDT";
  // "&apikey=" +
  // API_KEY;
  return AxiosInstance.get(request_string_url);
};

//function : get_token_from_bscscan
//input : token_symbol
//output : token_info
const get_token_price_from_fantom = (token_symbol: string) => {
  const Backend_baseUrl = process.env.REACT_APP_POOL_BACKEND_URL;

  if (token_symbol === "WBTC") token_symbol = "BTC";
  if (token_symbol === "WETH") token_symbol = "ETH";
  console.log("get_token_price_from_fantom = ", token_symbol);
  const request_string_url =
    // "https://dex.binance.org/api/v1/fees" +
    //"https://api.binance.com/api/v3/ticker/price?symbol=" +
    // "wss://stream.binance.com:9443/ws/etheur@trade";
    `${Backend_baseUrl}get_token_price_from_fantom?symbol=${token_symbol}`;
  console.log("1111111111111request_string_url = ", request_string_url);
  return AxiosInstance.get(request_string_url, {
    headers: {
      "cache-control": "no-cache",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

const get_tokens_balances_from_fantom = async (
  wallet_address: string,
  chainId: string
) => {
  var tokens: any = [];
  // wallet_address = "0x63d62E6CB2aA4de4E3c7E59D188480C7f13d8be5";
  let i = 0;
  let fantom_price1 = await get_fantom_price(chainId);
  console.log("fantom_price1 = ", fantom_price1);
  let fantom_price = await fantom_price1.data.result;
  // console.log("fantom_price=", fantom_price);
  while (i < PoolTokenListForFantom.length) {
    let request_string_url = "";
    let TokenItem = PoolTokenListForFantom[i];
    if (TokenItem.symbol === "FTM")
      request_string_url = `${FantomChainAddresses[chainId]}?module=account&action=balance&address=${wallet_address}&tag=latest&apikey=${API_KEY}`;
    else
      request_string_url = `${FantomChainAddresses[chainId]}?module=account&action=tokenbalance&address=${wallet_address}&contractaddress=${TokenItem.contract}&tag=latest&apikey=${API_KEY}`;
    // https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=0x04068da6c83afcfa0e13ba15a6696662335d5b75&address=0x63d62E6CB2aA4de4E3c7E59D188480C7f13d8be5&tag=latest&apikey=8U5KQNSDU6HE44XMV7SGD9UP6IKA7I7887
    console.log("request_string_url = ", request_string_url);
    let token = await AxiosInstance.get(request_string_url);
    console.log("ftm token = ", token);
    setTimeout(() => {
      // console.log("count =", i);
    }, 240);
    console.log("ftm    poolllll  token = ", token.data.result);
    let balance = 0;
    let fantom_balance_in_usd = 0;
    // console.log(token.data);
    if (token.data.status === "1") {
      balance = parseFloat(token.data.result) / 10 ** TokenItem.decimals;
      // # fantom_balance_in_usd = float(balance) * (float(get_matic_price(request)) / 1e18)
      fantom_balance_in_usd = balance * parseFloat(fantom_price);
    } else {
      balance = 0;
      fantom_balance_in_usd = 0;
    }
    let price = { data: 0 };
    try {
      price = await get_token_price_from_fantom(TokenItem.symbol);
    } catch (e) {
      console.log("error in get_token_price_from_fantom = ", e);
    }

    console.log("price = ", price.data);
    if (!price.data) {
      price = { ...price, data: 0 };
    }
    let usd_balance = 1 * price.data * balance;
    if (TokenItem.symbol === "FTM" || balance !== 0)
      tokens.push({
        symbol: TokenItem.symbol,
        price: price.data,
        // price: 1,

        contract: TokenItem.contract,
        balance: balance,
        usd_balance: usd_balance,
        // usd_balance: 0.1,
        fantom_price: fantom_price,
        // icon: get_token_logo(TokenItem.symbol),
        icon: TokenItem.icon,
        type: TokenItem.type,
        decimals: TokenItem.decimals,
      });
    i++;
  }

  return tokens;
};

export default get_tokens_balances_from_fantom;
