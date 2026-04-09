export interface User {
  id: string;
  username: string;
  hash: string;
  cash: number;
}

export interface Transaction {
  id: string;
  user_id: string;
  symbol: string;
  shares: number;
  price: number;
  action: 'Bought' | 'Sold';
  date: string;
}

export interface Quote {
  name: string;
  price: number;
  symbol: string;
}
