import * as _ from "lodash";

export interface CoinMarketcapCoin {
  id: string,
  name: string,
  percent_change_24h: string,
  percent_change_7d: string,
  price_usd: string,
  symbol: string,
}

export default function() {
  return fetch("https://api.coinmarketcap.com/v1/ticker/?limit=300")
    .then(res => res.json())
    .then(data => {
      return data as Array<CoinMarketcapCoin>;
    });
}
