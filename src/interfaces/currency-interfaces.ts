export interface Country {
  id: string;
  isoCode: string;
  currency: string;
}

export interface Convertion {
  convertedMoney: number;
  exchangeRate: number;
}

export type Inputs = {
  exitMoney: number;
  exitCountry: string;
  exitCurrency: string;
  enterMoney: number;
  enterCountry: string;
  enterCurrency: string;
}
