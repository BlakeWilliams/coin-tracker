import React from 'react';
import Price from './price';

class Coin extends React.Component {
  render() {
    const { data } = this.props;
    const symbol = data.symbol.toLowerCase();

    return (
      <div className="coin-container__coin">
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
