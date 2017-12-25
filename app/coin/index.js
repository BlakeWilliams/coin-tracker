import React from 'react';
import Price from './price';

class Coin extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div className="coin-container__coin">
        <p className="name">{data.name}</p>

        <div className="priceData">
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
