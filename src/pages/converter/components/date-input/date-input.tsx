import React from "react";

import { dateToString } from "../../../../shared/utils/date-to-string";

interface IProps {
  onChange: (val: string) => void;
}

export const DateInput = (props: IProps) => {
  const today = new Date();
  const maxDate = dateToString(today);
  const minDateTemp = new Date();
  minDateTemp.setDate(today.getDate() - 7);
  const minDate = dateToString(minDateTemp);

  return (
    <input
      type="date"
      name="date"
      defaultValue={maxDate}
      onChange={(evt) => props.onChange(evt.target.value)}
      min={minDate}
      max={maxDate}
    />
  );
};
