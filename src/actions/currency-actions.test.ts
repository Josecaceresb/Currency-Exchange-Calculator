import { getConvertedMoney } from './currency-actions';
import fetchMock from 'fetch-mock';

describe('getConvertedMoney', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const getCurrentDate = () => {
    const date = new Date().toISOString().split('T')[0];
    return date;
  };

  it('should return undefined if exitMoney is less than 5000 and exitCurrency is CLP', async () => {
    const result = await getConvertedMoney(4000, 'CLP', 'USD');
    expect(result).toBeUndefined();
  });

  it('should return converted money and exchange rate on successful API response from CLP to USD', async () => {
    const mockResponse = {
      clp: {
        usd: 0.0013,
      },
    };
    const currentDate = getCurrentDate();
    fetchMock.getOnce(`https://${currentDate}.currency-api.pages.dev/v1/currencies/clp.json`, {
      body: mockResponse,
      headers: { 'content-type': 'application/json' },
    });

    const result = await getConvertedMoney(10000, 'CLP', 'USD');
    expect(result).toEqual({
      convertedMoney: 12.35,
      exchangeRate: 769.231,
    });
  });

  it('should throw an error if API response is not ok', async () => {
    const currentDate = getCurrentDate();
    fetchMock.getOnce(`https://${currentDate}.currency-api.pages.dev/v1/currencies/clp.json`, 500);

    await expect(getConvertedMoney(10000, 'CLP', 'USD')).rejects.toThrow('Error converting money');
  });

  it('should return converted money and exchange rate on successful API response from USD to CLP', async () => {
    const mockResponse = {
      usd: {
        clp: 769.23,
      },
    };
    const currentDate = getCurrentDate();
    fetchMock.getOnce(`https://${currentDate}.currency-api.pages.dev/v1/currencies/usd.json`, {
      body: mockResponse,
      headers: { 'content-type': 'application/json' },
    });

    const result = await getConvertedMoney(13, 'USD', 'CLP');
    expect(result).toEqual({
      convertedMoney: 9499.99,
      exchangeRate: 769.23,
    });
  });
});