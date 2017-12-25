import React from 'react';
import formatCurrency from 'format-currency';
import classNames from 'classnames';

class Price extends React.Component {
  render() {
    const { value, twentyFourHourChange } = this.props;

    return (
      <p className="price">
        ${formatCurrency(value)}

        <div className={classNames("relative", { negative: twentyFourHourChange < 0 })}>
          {twentyFourHourChange}%
        </div>
      </p>
    )
  }
}

export default Price;
