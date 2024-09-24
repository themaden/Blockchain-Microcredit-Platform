import React, { useState } from 'react';

function LoanForm({ onSubmit }) {
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount: Number(amount), interestRate: Number(interestRate), duration: Number(duration) });
    setAmount('');
    setInterestRate('');
    setDuration('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Loan Request</h2>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="Interest Rate (%)" required />
      <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (months)" required />
      <button type="submit">Create Loan Request</button>
    </form>
  );
}

export default LoanForm;