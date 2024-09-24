// src/App.js
import React, { useState, useEffect } from 'react';
import { Server } from 'stellar-sdk';
import LoanForm from './components/LoanForm';
import LoanList from './components/LoanList';
import './App.css';

function App() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    setLoading(true);
    setError(null);
    try {
      // Mock data for demonstration
      const mockLoans = [
        { id: 1, borrower: 'GABCD...', amount: 1000, interestRate: 5, duration: 12, fundedAmount: 500, status: 'PENDING' },
        { id: 2, borrower: 'GDEFG...', amount: 2000, interestRate: 7, duration: 24, fundedAmount: 2000, status: 'FUNDED' },
      ];
      setLoans(mockLoans);
    } catch (error) {
      console.error('Error fetching loans:', error.message);
      setError('Krediler alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const createLoan = async (loanData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Creating loan:', loanData);
      // Simulate adding loan
      await fetchLoans();
    } catch (error) {
      console.error('Error creating loan:', error.message);
      setError('Kredi oluşturulurken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const fundLoan = async (loanId, amount) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Funding loan:', loanId, amount);
      // Simulate funding a loan
      await fetchLoans();
    } catch (error) {
      console.error('Error funding loan:', error.message);
      setError('Kredi finanse edilirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blockchain Microcredit Platform</h1>
      </header>
      <main>
        {loading && <p>Yükleniyor...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <LoanForm onSubmit={createLoan} />
        <LoanList loans={loans} onFund={fundLoan} />
      </main>
    </div>
  );
}

export default App;
