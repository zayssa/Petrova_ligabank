import React from "react";

import { IExchangeHistory } from "../../shared/models/exchange-history";
import { formatDate } from "../../../../shared/utils/format-date";
import globalStyles from "../../../../shared/styles/global.module.scss";
import styles from "./exchange-history.module.scss";

interface IProps {
  history: IExchangeHistory[];
  onClean: () => void;
}

export const ExchangeHistory = (props: IProps) => {
  return !props.history.length ? (
    <></>
  ) : (
    <div className={styles.history}>
      <h2>История конвертации</h2>

      <ul className={styles.history__list}>
        {props.history.map((item, idx) => (
          <li key={idx}>
            <span className={styles.history__date}>
              {formatDate(item["date"])}
            </span>
            <span className={styles.history__operation}>
              {item["summOut"]} {item["currencyOut"]}
              <svg
                width="41"
                height="18"
                viewBox="0 0 41 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.history__arrow}
              >
                <path d="M27.2 17L40 9L27.2 1" stroke="#1F1E25" />
                <path
                  d="M40 9C34.6667 9 15.7407 9 6.66667 9H0"
                  stroke="#1F1E25"
                />
              </svg>
              {item["summIn"]} {item["currencyIn"]}
            </span>
          </li>
        ))}
      </ul>
      <button
        className={[globalStyles.button, styles.button_clear].join(" ")}
        onClick={props.onClean}
      >
        Очистить историю
      </button>
    </div>
  );
};
