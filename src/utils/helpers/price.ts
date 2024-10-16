export const priceToFloat = (str: string): number => {
  const priceString = str.split(' ')[0].replace('$', '');
  return parseFloat(priceString);
};

export const roundToCents = (price: number): number => {
  return Math.round(price * 100) / 100;
};

export const priceToText = (
  price: number,
  currencyShort = '$',
  currency = 'USD',
): string => {
  return `${currencyShort}${roundToCents(price).toFixed(2)} ${currency}`;
};

export const calculateSummary = (prices: number[]): number => {
  return roundToCents(prices.reduce((acc, curr) => acc + curr, 0));
};

export const getPriceForCurrentMonth = (price: number): number => {
  const now = new Date();
  const daysThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const today = now.getDate();
  const coefficient = (daysThisMonth - today + 1) / daysThisMonth;
  return roundToCents(price * coefficient);
};
