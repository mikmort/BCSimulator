import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { db, type Customer } from './db';
import { GlobalHeader, TopNav, ActionBar } from './components/Layout';
import './App.css';

export default function CustomerCard() {
  const { no } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (!no) return;
    const n = parseInt(no, 10);
    db.customers.where('no').equals(n).first().then((c) => setCustomer(c ?? null));
  }, [no]);

  if (!customer) {
    return <div className="app-container">Loading...</div>;
  }

  return (
    <div className="app-container">
      <GlobalHeader />
      <TopNav />
      <ActionBar title="Customer Card" />
      <div className="content" style={{ padding: '12px' }}>
        <div style={{ flex: 1 }}>
          <Link to="/" className="back-button" title="Back to list">
            <FiArrowLeft />
          </Link>
          <form className="card-form">
            <div>
              <label>
                No.
                <input type="text" value={customer.no} readOnly />
              </label>
            </div>
            <div>
              <label>
                Name
                <input type="text" value={customer.name} readOnly />
              </label>
            </div>
            <div>
              <label>
                Location Code
                <input type="text" value={customer.locationCode} readOnly />
              </label>
            </div>
            <div>
              <label>
                Phone Number
                <input type="text" value={customer.phoneNumber} readOnly />
              </label>
            </div>
            <div>
              <label>
                Contact
                <input type="text" value={customer.contact} readOnly />
              </label>
            </div>
          </form>
        </div>
        <div className="fact-box">
          <div className="fact-section">
            <h3>Summary</h3>
          </div>
          <div className="fact-section">
            <h3>Customer Picture</h3>
          </div>
          <div className="fact-section">
            <h3>Sell-to Customer Sales History</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
