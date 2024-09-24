use soroban_sdk::{contractimpl, symbol_short, vec, Env, Symbol, Vec, Map};
use serde::{Serialize, Deserialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Loan {
    id: u64,
    borrower: Symbol,
    amount: i128,
    interest_rate: i128,
    duration: u64,
    funded_amount: i128,
    status: Symbol,
}

pub struct MicrocreditContract;

#[contractimpl]
impl MicrocreditContract {
    pub fn init(env: Env) -> Self {
        env.storage().instance().set(&symbol_short!("next_id"), &0u64);
        env.storage().instance().set(&symbol_short!("loans"), &Map::new(&env));
        Self
    }

    pub fn create_loan_request(
        env: Env,
        borrower: Symbol,
        amount: i128,
        interest_rate: i128,
        duration: u64,
    ) -> u64 {
        let mut next_id: u64 = env.storage().instance().get(&symbol_short!("next_id")).unwrap_or(0);
        let loan = Loan {
            id: next_id,
            borrower,
            amount,
            interest_rate,
            duration,
            funded_amount: 0,
            status: symbol_short!("PENDING"),
        };

        let mut loans: Map<u64, Vec<u8>> = env.storage().instance().get(&symbol_short!("loans")).unwrap_or(Map::new(&env));
        loans.set(next_id, serde_json::to_vec(&loan).unwrap().into());
        env.storage().instance().set(&symbol_short!("loans"), &loans);

        next_id += 1;
        env.storage().instance().set(&symbol_short!("next_id"), &next_id);

        next_id - 1
    }

    pub fn fund_loan(env: Env, loan_id: u64, investor: Symbol, amount: i128) {
        let mut loans: Map<u64, Vec<u8>> = env.storage().instance().get(&symbol_short!("loans")).unwrap();
        let loan_bytes = loans.get(loan_id).expect("Loan not found");
        let mut loan: Loan = serde_json::from_slice(&loan_bytes).unwrap();

        assert!(loan.status == symbol_short!("PENDING"), "Loan is not available for funding");
        assert!(loan.funded_amount + amount <= loan.amount, "Overfunding not allowed");

        loan.funded_amount += amount;
        if loan.funded_amount == loan.amount {
            loan.status = symbol_short!("FUNDED");
        }

        loans.set(loan_id, serde_json::to_vec(&loan).unwrap().into());
        env.storage().instance().set(&symbol_short!("loans"), &loans);
    }

    pub fn repay_loan(env: Env, loan_id: u64, amount: i128) {
        let mut loans: Map<u64, Vec<u8>> = env.storage().instance().get(&symbol_short!("loans")).unwrap();
        let loan_bytes = loans.get(loan_id).expect("Loan not found");
        let mut loan: Loan = serde_json::from_slice(&loan_bytes).unwrap();

        assert!(loan.status == symbol_short!("FUNDED"), "Loan is not ready for repayment");

        // Implement repayment logic here
        loan.status = symbol_short!("REPAID");

        loans.set(loan_id, serde_json::to_vec(&loan).unwrap().into());
        env.storage().instance().set(&symbol_short!("loans"), &loans);
    }

    pub fn get_loan_details(env: Env, loan_id: u64) -> Vec<u8> {
        let loans: Map<u64, Vec<u8>> = env.storage().instance().get(&symbol_short!("loans")).unwrap();
        loans.get(loan_id).expect("Loan not found")
    }

    pub fn get_all_loans(env: Env) -> Vec<Vec<u8>> {
        let loans: Map<u64, Vec<u8>> = env.storage().instance().get(&symbol_short!("loans")).unwrap();
        loans.values().collect()
    }
}