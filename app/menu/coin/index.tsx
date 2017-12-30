import * as React from "react";
import { shell } from "electron";

import { CoinMarketcapCoin } from '../fetchCoinMarketCap';
import Price from "./price";

const COIN_URL_BASE = "https://coinmarketcap.com/currencies";

interface Props {
  data?: CoinMarketcapCoin,
}

class Coin extends React.Component<Props, null> {
  openUrl() {
    const { data } = this.props;
    shell.openExternal(`${COIN_URL_BASE}/${data.id}`);
  }

  render() {
    const { data } = this.props;
    const symbol = data.symbol.toLowerCase();

    return (
      <div onClick={() => this.openUrl()} className="coin-container__coin">
        <img
          className="icon"
          src={`cryptocurrency-icons/svg/color/${symbol}.svg`}
        />
        <p className="name">{data.name}</p>

        <div className="price-data">
          <Price
            value={data.price_usd}
            twentyFourHourChange={data.percent_change_24h}
            sevenDayChange={data.percent_change_7d}
          />
        </div>
      </div>
    );
  }
}

export default Coin;
