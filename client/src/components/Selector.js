import React from "react";
import moment from "moment";

const Selector = ({ initialYear, finalYear, onChangePeriod }) => {
  const generateValues = () => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from(
      { length: finalYear - initialYear + 1 },
      (_, i) => initialYear + i
    );
    const options = [];

    for (const year in years) {
      months.map((v, i) => {
        const display = `${moment.monthsShort(i)}/${years[year]}`;
        const value = `${years[year]}-${v.toString().padStart(2, "0")}`;
        options.push({ display, value });
        return { display, value };
      });
    }

    return options.map(({ value, display }) => {
      return (
        <option key={value} value={value}>
          {display}
        </option>
      );
    });
  };

  const onChange = (event) => {
    if (onChangePeriod) 
      onChangePeriod(event.target.value);
  };

  return (
    <div className="container">
      <select className="browser-default match" onChange={onChange}>
        {generateValues()}
      </select>
    </div>
  );
};

export default Selector;
