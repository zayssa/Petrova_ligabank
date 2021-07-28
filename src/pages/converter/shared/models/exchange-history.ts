import { CURRENCIES } from "../../../../shared/entities/currencies";

export interface IExchangeHistory {
  date: string;
  summIn: number;
  summOut: number;
  currencyIn: string;
  currencyOut: string;
}
