import React from 'react';
import Price from './price';
import { shell } from 'electron';

const COIN_URL_BASE = 'https://coinmarketcap.com/currencies';

class Coin extends React.Component {
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
