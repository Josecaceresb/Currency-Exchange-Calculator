"use server";

import { Convertion, Country } from "@/interfaces";

export async function getSendCountries(): Promise<Country[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/sendCountries`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Error fetching send countries");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getIncomingCountries(): Promise<Country[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/incomingCountries`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Error fetching incoming countries");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getConvertedMoney(
  exitMoney: number,
  exitCurrency: string,
  enterCurrency: string,
): Promise<Convertion | undefined> {
  try {
    if (exitMoney < 5000 && exitCurrency === "CLP") return undefined;
    const date = new Date().toISOString().split('T')[0];
    const url = `https://${date}.currency-api.pages.dev/v1/currencies/${exitCurrency.toLowerCase()}.json`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Error converting money");
    }

    const convertions = await response.json();
    const convertion = convertions[exitCurrency.toLowerCase()][enterCurrency.toLowerCase()];
    const beforeCommission = convertion * exitMoney;
    const finalMount = Number((beforeCommission * 0.95).toFixed(2));
    return {
      convertedMoney: finalMount,
      exchangeRate: exitCurrency === 'CLP' ? Number((1 / convertion).toFixed(3)) : Number(convertion.toFixed(3)),
    };
  } catch (error) {
    throw new Error("Error converting money");
  }
}