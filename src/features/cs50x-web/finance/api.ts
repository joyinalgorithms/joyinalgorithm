import { Quote } from './types';

// Connects dynamically to the CS50 finance lookup endpoint using a CORS proxy fallback if needed.
export async function lookup(symbol: string): Promise<Quote | null> {
  const url = `https://finance.cs50.io/quote?symbol=${symbol.toUpperCase()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
        return null;
    }
    const quoteData = await response.json();
    return {
      name: quoteData.companyName,
      price: quoteData.latestPrice,
      symbol: symbol.toUpperCase()
    };
  } catch (e) {
    console.error("CS50 Finance API Request error:", e);
    return null;
  }
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
