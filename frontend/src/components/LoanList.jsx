import React, { useState } from 'react';
import './LoanList.css'; // Özel stil dosyası ekleyin

function LoanList({ loans, onFund }) {
  const [filter, setFilter] = useState('ALL');

  const filteredLoans = loans.filter(loan => 
    filter === 'ALL' || loan.status === filter
  );

  return (
    <div>
      <h2>Active Loans</h2>
      <div>
        <label htmlFor="filter">Filter by Status: </label>
        <select 
          id="filter" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="FUNDED">Funded</option>
        </select>
      </div>
      <ul>
        {filteredLoans.map((loan) => (
          <li key={loan.id} className={loan.status === 'PENDING' ? 'pending' : 'funded'}>
            <div>
              <strong>Loan #{loan.id}</strong>
              <p>Amount: {loan.amount}</p>
              <p>Interest Rate: {loan.interestRate}%</p>
              <p>Duration: {loan.duration} months</p>
              <p>Status: <span className={loan.status === 'PENDING' ? 'status-pending' : 'status-funded'}>{loan.status}</span></p>
            </div>
            {loan.status === 'PENDING' && (
              <div>
                <input 
                  type="number" 
                  placeholder="Amount to fund" 
                  onChange={(e) => onFund(loan.id, Math.min(loan.amount - loan.fundedAmount, parseFloat(e.target.value) || 0))}
                />
                <button onClick={() => onFund(loan.id, loan.amount - loan.fundedAmount)}>Fund</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoanList;
