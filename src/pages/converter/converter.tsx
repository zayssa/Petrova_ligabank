import React from "react";

import { IExchangeHistory } from "./shared/models/exchange-history";
import { IExchangeRatios } from "./shared/models/exchange-ratios";
import { PROCESS_TYPES } from "./shared/enums/process-type";
import { DEFAULT_CURRENCY, CURRENCIES } from "../../shared/entities/currencies";
import { dateToString } from "../../shared/utils/date-to-string";
import { SummInput } from "./components/summ-input/summ-input";
import { DateInput } from "./components/date-input/date-input";
import { ExchangeHistory } from "./components/exchange-history/exchange-history";
import globalStyles from "../../shared/styles/global.module.scss";
import styles from "./converter.module.scss";

export const Converter = () => {
  const [history, setHistory] = React.useState<IExchangeHistory[]>(
    JSON.parse(localStorage.getItem("exchangeHistory") || "[]")
  );
  const [currentProcessType, setCurrentProcessType] =
    React.useState<PROCESS_TYPES>(PROCESS_TYPES.ALL);

  const [ratios, setRatios] = React.useState<IExchangeRatios>({});
  const [date, setDate] = React.useState<IExchangeHistory["date"]>(
    dateToString(new Date())
  );
  const [summOut, setSummOut] =
    React.useState<IExchangeHistory["summOut"]>(1000);
  const [currencyOut, setCurrencyOut] =
    React.useState<string>(DEFAULT_CURRENCY);
  const [summIn, setSummIn] = React.useState<IExchangeHistory["summIn"]>(0);
  const [currencyIn, setCurrencyIn] = React.useState<string>("USD");

  const dateChangeHandler = () => {
    const dateArr = date.split("-");
    const url = `https://www.cbr-xml-daily.ru/archive/${dateArr[0]}/${dateArr[1]}/${dateArr[2]}/daily_json.js`;

    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        const values = data.Valute;
        const newRatios: IExchangeRatios = {
          [DEFAULT_CURRENCY]: 1,
        };

        CURRENCIES.forEach((currency) => {
          if (!values[currency]) {
            return;
          }

          newRatios[currency] =
            values[currency].Value / values[currency].Nominal;
        });

        setRatios(newRatios);
      });
  };

  const exchangeSubmitHandler = (): void => {
    const newHistory = [
      ...history,
      {
        date,
        summIn,
        summOut,
        currencyIn,
        currencyOut,
      },
    ];

    if (newHistory.length > 10) {
      newHistory.shift();
    }

    setHistory(newHistory);

    localStorage.setItem("exchangeHistory", JSON.stringify(newHistory));
  };

  const historyCleanHandler = (): void => {
    localStorage.removeItem("exchangeHistory");
    setHistory([]);
  };

  const calculate = (currentProcessType: PROCESS_TYPES): number => {
    const summ = currentProcessType === PROCESS_TYPES.OUT ? summOut : summIn;
    const summCurrency =
      currentProcessType === PROCESS_TYPES.OUT ? currencyOut : currencyIn;
    const targetCurrency =
      currentProcessType === PROCESS_TYPES.OUT ? currencyIn : currencyOut;
    return parseFloat(
      ((summ * ratios[summCurrency]) / ratios[targetCurrency]).toFixed(2)
    );
  };

  React.useEffect(() => {
    if (currentProcessType === PROCESS_TYPES.ALL) {
      return;
    }

    if (currentProcessType === PROCESS_TYPES.IN) {
      setCurrentProcessType(PROCESS_TYPES.NONE);
      return;
    }

    setCurrentProcessType(PROCESS_TYPES.OUT);
    setSummIn(calculate(PROCESS_TYPES.OUT));
  }, [summOut, currencyOut]);

  React.useEffect(() => {
    if (currentProcessType === PROCESS_TYPES.ALL) {
      return;
    }

    if (currentProcessType === PROCESS_TYPES.OUT) {
      setCurrentProcessType(PROCESS_TYPES.NONE);
      return;
    }

    setCurrentProcessType(PROCESS_TYPES.IN);
    setSummOut(calculate(PROCESS_TYPES.IN));
  }, [summIn, currencyIn]);

  React.useEffect(dateChangeHandler, [date]);

  React.useEffect(() => {
    if (Object.keys(ratios).length === 0) {
      return;
    }

    setCurrentProcessType(PROCESS_TYPES.OUT);
    setSummIn(calculate(PROCESS_TYPES.OUT));
  }, [ratios]);

  return (
    <section className={styles.converter}>
      <div className={globalStyles.wrapper}>
        <h1>Конвертер валют</h1>

        <form action="" className={styles.form}>
          <div className={styles.form__row}>
            <div className={styles.form__currency}>
              <label htmlFor="sum1">У меня есть</label>

              <div className={styles.form__summ}>
                <SummInput
                  id="sum1"
                  summ={summOut}
                  onSummChange={setSummOut}
                  currency={currencyOut}
                  onCurrencyChange={setCurrencyOut}
                  availableCurrencies={Object.keys(ratios)}
                ></SummInput>
              </div>
            </div>

            <div className={styles.form__arrows}>
              <svg
                width="53"
                height="36"
                viewBox="0 0 53 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="translate(0 -9)">
                  <path d="M19 1L3 9L19 17" stroke="#1F1E25" strokeWidth="2" />
                  <path
                    d="M3 9C9.66667 9 33.3241 9 44.6667 9L53 9"
                    stroke="#1F1E25"
                    strokeWidth="2"
                  />
                </g>

                <g transform="translate(0 9)">
                  <path d="M34 17L50 9L34 1" stroke="#1F1E25" strokeWidth="2" />
                  <path
                    d="M50 9C43.3333 9 19.6759 9 8.33333 9H0"
                    stroke="#1F1E25"
                    strokeWidth="2"
                  />
                </g>
              </svg>
            </div>

            <div className={styles.form__currency}>
              <label htmlFor="sum2">Хочу приобрести</label>

              <div className={styles.form__summ}>
                <SummInput
                  id="sum2"
                  summ={summIn}
                  onSummChange={setSummIn}
                  currency={currencyIn}
                  onCurrencyChange={setCurrencyIn}
                  availableCurrencies={Object.keys(ratios)}
                ></SummInput>
              </div>
            </div>
          </div>

          <div className={styles.form__row}>
            <div className={styles.form__date}>
              <DateInput onChange={setDate}></DateInput>
            </div>

            <button
              className={[
                globalStyles.button,
                globalStyles.button_big,
                styles.form__submit,
              ].join(" ")}
              type="submit"
              onClick={exchangeSubmitHandler}
            >
              Сохранить результат
            </button>
          </div>
        </form>

        <ExchangeHistory history={history} onClean={historyCleanHandler} />
      </div>
    </section>
  );
};
