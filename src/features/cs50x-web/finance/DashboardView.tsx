import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Table from '@mui/joy/Table';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Alert from '@mui/joy/Alert';
import { User, Transaction } from './types';
import { lookup, formatUsd } from './api';

interface DashboardViewProps {
  userId: string;
  onLogout: () => void;
}

export function DashboardView({ userId, onLogout }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState(0);

  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Reload database wrapper
  const loadDb = () => {
    const users: User[] = JSON.parse(localStorage.getItem('cs50x_finance_users') || '[]');
    const txs: Transaction[] = JSON.parse(localStorage.getItem('cs50x_finance_transactions') || '[]');
    
    const currentUser = users.find(u => u.id === userId);
    if (!currentUser) {
      onLogout();
      return;
    }
    
    setUser(currentUser);
    setTransactions(txs.filter(t => t.user_id === userId));
  };

  useEffect(() => {
    loadDb();
  }, [userId]);

  if (!user) return null;

  return (
    <Box sx={{ maxWidth: '1000px', mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
         <Typography level="h2">
          <span style={{ color: '#096bde' }}>C</span>
          <span style={{ color: '#e53e3e' }}>$</span>
          <span style={{ color: '#d69e2e' }}>5</span>
          <span style={{ color: '#38a169' }}>0</span>
          {' '}Finance
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography>Welcome, <b>{user.username}</b></Typography>
            <Button variant="outlined" color="neutral" size="sm" onClick={onLogout}>Log Out</Button>
        </Box>
      </Box>

      <Card variant="outlined" sx={{ flexGrow: 1, boxShadow: "sm", borderRadius: "xl", p: { xs: 1, md: 2 } }}>
        <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val as number)} sx={{ bgcolor: 'transparent' }}>
          <TabList disableUnderline sx={{ p: 0.5, gap: 0.5, borderRadius: 'xl', bgcolor: 'background.level1', mb: 3 }}>
            <Tab disableIndicator sx={{ borderRadius: 'lg' }}>Portfolio</Tab>
            <Tab disableIndicator sx={{ borderRadius: 'lg' }}>Quote</Tab>
            <Tab disableIndicator sx={{ borderRadius: 'lg' }}>Buy</Tab>
            <Tab disableIndicator sx={{ borderRadius: 'lg' }}>Sell</Tab>
            <Tab disableIndicator sx={{ borderRadius: 'lg' }}>History</Tab>
            <Tab disableIndicator sx={{ borderRadius: 'lg' }}>Add Cash</Tab>
          </TabList>

          <TabPanel value={0} sx={{ p: 2 }}>
            <PortfolioTab user={user} transactions={transactions} />
          </TabPanel>
          <TabPanel value={1} sx={{ p: 2 }}>
            <QuoteTab />
          </TabPanel>
          <TabPanel value={2} sx={{ p: 2 }}>
            <BuyTab user={user} reloadDb={loadDb} setTab={setActiveTab} />
          </TabPanel>
          <TabPanel value={3} sx={{ p: 2 }}>
             <SellTab user={user} transactions={transactions} reloadDb={loadDb} setTab={setActiveTab} />
          </TabPanel>
          <TabPanel value={4} sx={{ p: 2 }}>
            <HistoryTab transactions={transactions} />
          </TabPanel>
          <TabPanel value={5} sx={{ p: 2 }}>
            <AddCashTab user={user} reloadDb={loadDb} setTab={setActiveTab} />
          </TabPanel>
        </Tabs>
      </Card>
    </Box>
  );
}

// --- TAB COMPONENTS ---

function PortfolioTab({ user, transactions }: { user: User, transactions: Transaction[] }) {
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});
  
  // Aggregate shares
  const holdings: Record<string, number> = {};
  for (const t of transactions) {
    if (!holdings[t.symbol]) holdings[t.symbol] = 0;
    holdings[t.symbol] += t.shares; // buy is positive, sell is negative
  }
  
  const activeHoldings = Object.entries(holdings).filter(([sym, sh]) => sh > 0).map(([sym, sh]) => ({ symbol: sym, shares: sh }));

  useEffect(() => {
    // Fetch live quotes for active holdings
    const fetchQuotes = async () => {
      const prices: Record<string, number> = {};
      for (const h of activeHoldings) {
        const q = await lookup(h.symbol);
        if (q) prices[h.symbol] = q.price;
      }
      setLivePrices(prices);
    };
    fetchQuotes();
  }, [transactions]); // Refetch if transactions change

  let stockTotal = 0;
  for (const h of activeHoldings) {
     stockTotal += (h.shares * (livePrices[h.symbol] || 0));
  }
  const grandTotal = user.cash + stockTotal;

  return (
    <Box>
       <Typography level="h3" sx={{ mb: 3 }}>Investment Portfolio</Typography>
       <Table variant="outlined" sx={{ mb: 4, '& thead th': { bgcolor: 'background.level1' }}}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Shares</th>
            <th>Live Price</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {activeHoldings.length === 0 ? (
             <tr><td colSpan={4} style={{ textAlign: 'center' }}>No holdings yet.</td></tr>
          ) : activeHoldings.map((h, i) => (
             <tr key={h.symbol}>
               <td>{h.symbol}</td>
               <td>{h.shares}</td>
               <td>{livePrices[h.symbol] ? formatUsd(livePrices[h.symbol]) : 'Fetching...'}</td>
               <td>{livePrices[h.symbol] ? formatUsd(h.shares * livePrices[h.symbol]) : '...'}</td>
             </tr>
          ))}
          <tr>
            <td colSpan={3} style={{ textAlign: 'right', fontWeight: 'bold' }}>Cash Reserve</td>
            <td style={{ fontWeight: 'bold' }}>{formatUsd(user.cash)}</td>
          </tr>
          <tr>
            <td colSpan={3} style={{ textAlign: 'right', fontWeight: 'bold' }}>Grand Total</td>
            <td style={{ fontWeight: 'bold' }}>{formatUsd(grandTotal)}</td>
          </tr>
        </tbody>
       </Table>
    </Box>
  );
}

function QuoteTab() {
  const [symbol, setSymbol] = useState('');
  const [result, setResult] = useState<{name: string, price: number, symbol: string} | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!symbol) return setError("Must provide a symbol.");

    const quote = await lookup(symbol);
    if (!quote) return setError("Symbol does not exist or API rate limited.");
    setResult(quote);
  };

  return (
    <Box sx={{ maxWidth: '400px', mx: 'auto' }}>
       <Typography level="h3" sx={{ mb: 3 }}>Get Stock Quote</Typography>
       <form onSubmit={handleQuote}>
          <Stack spacing={2} sx={{ mb: 4 }}>
            <Input 
              placeholder="e.g. AAPL" 
              value={symbol} 
              onChange={e => setSymbol(e.target.value.toUpperCase())}
            />
            <Button type="submit">Quote</Button>
          </Stack>
       </form>

       {error && <Alert color="danger" variant="soft">{error}</Alert>}
       {result && (
         <Card variant="soft" color="success">
           <CardContent>
             <Typography level="body-sm">{result.name} ({result.symbol})</Typography>
             <Typography level="h2">{formatUsd(result.price)}</Typography>
           </CardContent>
         </Card>
       )}
    </Box>
  );
}

function BuyTab({ user, reloadDb, setTab }: { user: User, reloadDb: () => void, setTab: (t: number) => void }) {
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numShares = parseInt(shares, 10);
    if (!symbol || !shares || isNaN(numShares) || numShares <= 0) {
      return setError("Invalid input or shares.");
    }

    const quote = await lookup(symbol);
    if (!quote) return setError("Invalid symbol or API rate limited.");

    const totalCost = quote.price * numShares;
    if (user.cash < totalCost) return setError("Not enough cash.");

    // Update DB
    const users: User[] = JSON.parse(localStorage.getItem('cs50x_finance_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex].cash -= totalCost;
    localStorage.setItem('cs50x_finance_users', JSON.stringify(users));

    const txs: Transaction[] = JSON.parse(localStorage.getItem('cs50x_finance_transactions') || '[]');
    txs.push({
      id: crypto.randomUUID(),
      user_id: user.id,
      symbol: quote.symbol,
      shares: numShares,
      price: quote.price,
      action: 'Bought',
      date: new Date().toLocaleString()
    });
    localStorage.setItem('cs50x_finance_transactions', JSON.stringify(txs));

    alert(`Successfully bought ${numShares} shares of ${quote.symbol}.`);
    setSymbol('');
    setShares('');
    reloadDb();
    setTab(0); // Redirect to Portfolio
  };

  return (
    <Box sx={{ maxWidth: '400px', mx: 'auto' }}>
       <Typography level="h3" sx={{ mb: 3 }}>Buy Shares</Typography>
       <Typography level="body-sm" sx={{ mb: 2 }}>Available Cash: {formatUsd(user.cash)}</Typography>
       {error && <Alert color="danger" variant="soft" sx={{ mb: 2 }}>{error}</Alert>}
       <form onSubmit={handleBuy}>
          <Stack spacing={2}>
            <Input placeholder="Symbol (e.g. MSFT)" value={symbol} onChange={e => setSymbol(e.target.value.toUpperCase())} />
            <Input type="number" placeholder="Number of Shares" value={shares} onChange={e => setShares(e.target.value)} />
            <Button color="success" type="submit">Buy</Button>
          </Stack>
       </form>
    </Box>
  );
}

function SellTab({ user, transactions, reloadDb, setTab }: { user: User, transactions: Transaction[], reloadDb: () => void, setTab: (t: number) => void }) {
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState('');
  const [error, setError] = useState<string | null>(null);

  const holdings: Record<string, number> = {};
  for (const t of transactions) {
    if (!holdings[t.symbol]) holdings[t.symbol] = 0;
    holdings[t.symbol] += t.shares; 
  }
  const activeHoldings = Object.entries(holdings).filter(([sym, sh]) => sh > 0);

  const handleSell = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numShares = parseInt(shares, 10);
    if (!symbol || !shares || isNaN(numShares) || numShares <= 0) {
      return setError("Invalid input or shares.");
    }

    if (!holdings[symbol] || holdings[symbol] < numShares) {
       return setError("Not enough shares to sell.");
    }

    const quote = await lookup(symbol);
    if (!quote) return setError("Invalid symbol or API rate limited.");

    const totalRevenue = quote.price * numShares;

    // Update DB
    const users: User[] = JSON.parse(localStorage.getItem('cs50x_finance_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex].cash += totalRevenue; // Add cash
    localStorage.setItem('cs50x_finance_users', JSON.stringify(users));

    const txs: Transaction[] = JSON.parse(localStorage.getItem('cs50x_finance_transactions') || '[]');
    txs.push({
      id: crypto.randomUUID(),
      user_id: user.id,
      symbol: quote.symbol,
      shares: -numShares, // Negative shares represents sale
      price: quote.price,
      action: 'Sold',
      date: new Date().toLocaleString()
    });
    localStorage.setItem('cs50x_finance_transactions', JSON.stringify(txs));

    alert(`Successfully sold ${numShares} shares of ${quote.symbol}.`);
    setSymbol('');
    setShares('');
    reloadDb();
    setTab(0);
  };

  return (
     <Box sx={{ maxWidth: '400px', mx: 'auto' }}>
       <Typography level="h3" sx={{ mb: 3 }}>Sell Shares</Typography>
       {error && <Alert color="danger" variant="soft" sx={{ mb: 2 }}>{error}</Alert>}
       <form onSubmit={handleSell}>
          <Stack spacing={2}>
            
            <Select placeholder="Select Symbol" value={symbol} onChange={(e, val) => setSymbol(val as string)}>
              {activeHoldings.length === 0 && <Option value="" disabled>No shares owned</Option>}
              {activeHoldings.map(([syn, sh]) => (
                <Option key={syn} value={syn}>{syn} ({sh} available)</Option>
              ))}
            </Select>

            <Input type="number" placeholder="Number of Shares" value={shares} onChange={e => setShares(e.target.value)} />
            <Button color="danger" type="submit">Sell</Button>
          </Stack>
       </form>
    </Box>
  );
}

function HistoryTab({ transactions }: { transactions: Transaction[] }) {
   // Sort by newest first
   const sorted = [...transactions].reverse();
   
   return (
    <Box>
       <Typography level="h3" sx={{ mb: 3 }}>Transaction History</Typography>
       <Box sx={{ overflowX: 'auto' }}>
         <Table variant="outlined" sx={{ '& thead th': { bgcolor: 'background.level1' }}}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Shares</th>
              <th>Exec Price</th>
              <th>Total</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
               <tr><td colSpan={6} style={{ textAlign: 'center' }}>No transactions recorded.</td></tr>
            ) : sorted.map((t) => (
               <tr key={t.id}>
                 <td style={{ fontWeight: 600 }}>{t.symbol}</td>
                 <td>{Math.abs(t.shares)}</td>
                 <td>{formatUsd(t.price)}</td>
                 <td>{formatUsd(Math.abs(t.shares) * t.price)}</td>
                 <td>{t.date}</td>
                 <td>
                    <Card variant="soft" color={t.action === 'Sold' ? 'danger' : 'success'} sx={{ p: 0.5, px: 1, display: 'inline-block' }}>
                        <Typography level="body-xs" fontWeight="bold">{t.action}</Typography>
                    </Card>
                 </td>
               </tr>
            ))}
          </tbody>
         </Table>
       </Box>
    </Box>
  );
}

function AddCashTab({ user, reloadDb, setTab }: { user: User, reloadDb: () => void, setTab: (t: number) => void }) {
  const [cash, setCash] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCashIn = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(cash);
    if (isNaN(amount) || amount <= 0) return setError("Invalid cash amount");

    const users: User[] = JSON.parse(localStorage.getItem('cs50x_finance_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex].cash += amount;
    localStorage.setItem('cs50x_finance_users', JSON.stringify(users));

    alert(`Added ${formatUsd(amount)} to your account.`);
    setCash('');
    reloadDb();
    setTab(0);
  };

  return (
    <Box sx={{ maxWidth: '400px', mx: 'auto' }}>
       <Typography level="h3" sx={{ mb: 3 }}>Add Cash</Typography>
       {error && <Alert color="danger" variant="soft" sx={{ mb: 2 }}>{error}</Alert>}
       <form onSubmit={handleCashIn}>
          <Stack spacing={2}>
            <Input type="number" slotProps={{ input: { step: '0.01' } }} placeholder="Amount (e.g. 1000)" value={cash} onChange={e => setCash(e.target.value)} />
            <Button color="primary" type="submit">Cash In</Button>
          </Stack>
       </form>
    </Box>
  );
}
