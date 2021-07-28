import React from "react";

interface IProps {
  id: string;
  summ: number;
  currency: string;
  availableCurrencies: string[];
  onSummChange: (val: number) => void;
  onCurrencyChange: (val: string) => void;
}

export const SummInput = (props: IProps) => {
  return (
    <>
      <input
        type="number"
        name={props.id}
        id={props.id}
        step="0.01"
        min="0"
        value={props.summ}
        onChange={(evt) => props.onSummChange(Number(evt.target.value))}
      />
      <select
        name={`currency${props.id}`}
        onChange={(evt) => props.onCurrencyChange(evt.target.value)}
        value={props.currency}
      >
        {props.availableCurrencies.map((currency) => (
          <option key={`${props.id}-${currency}`} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </>
  );
};
