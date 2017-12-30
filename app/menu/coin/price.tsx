import * as React from "react";
import formatCurrency from "format-currency";
import classNames from "classnames";

interface Props {
  value: string,
  twentyFourHourChange: string,
  sevenDayChange: string,
}

class Price extends React.Component<Props, null> {
  render() {
    const { value, twentyFourHourChange } = this.props;

    return (
      <div className="price">
        ${formatCurrency(value)}
        <div
          className={classNames("relative", {
            negative: parseFloat(twentyFourHourChange) < 0,
          })}
        >
          {twentyFourHourChange}%
        </div>
      </div>
    );
  }
}

export default Price;
