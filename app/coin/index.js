import React from 'react';
import Price from './price';

class Coin extends React.Component {
  render() {
    const { data } = this.props;
    const symbol = data.symbol.toLowerCase();
    // const image = require(`../cryptocurrency-icons/icons/${symbol}.svg`)

    return (
      <div className="coin-container__coin">
        <img src={`cryptocurrency-icons/svg/color/${symbol}.svg`} style={imageStyle}/>
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

const imageStyle = {
  maxWidth: "22px",
  maxHeight: "22px",
  marginRight: "7px",
}

export default Coin;
