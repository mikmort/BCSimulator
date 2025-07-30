import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Input } from '@fluentui/react-components';
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
      <div className="content">
        <div style={{ flex: 1, padding: '12px' }}>
          <form className="card-form">
          <div className="section">
            <h3>General</h3>
            <label>
              No.
              <Input value={customer.no.toString()} readOnly style={{ width: 200 }} />
            </label>
            <label>
              Name
              <Input value={customer.name} readOnly style={{ width: 200 }} />
            </label>
          </div>
          <div className="section">
            <h3>Address and Contact</h3>
            <label>
              Address
              <Input value={customer.address ?? ''} readOnly style={{ width: 200 }} />
            </label>
            <label>
              City
              <Input value={customer.city ?? ''} readOnly style={{ width: 200 }} />
            </label>
            <label>
              State
              <Input value={customer.state ?? ''} readOnly style={{ width: 200 }} />
            </label>
            <label>
              Zip Code
              <Input value={customer.zipCode ?? ''} readOnly style={{ width: 200 }} />
            </label>
            <label>
              Country
              <Input value={customer.country ?? ''} readOnly style={{ width: 200 }} />
            </label>
            <label>
              Phone Number
              <Input value={customer.phoneNumber ?? ''} readOnly style={{ width: 200 }} />
            </label>
            <label>
              Mobile Phone Number
              <Input value={customer.mobilePhoneNumber ?? ''} readOnly style={{ width: 200 }} />
            </label>
            <label>
              Email
              <Input value={customer.email ?? ''} readOnly style={{ width: 200 }} />
            </label>
            <label>
              Home Page
              <Input value={customer.homePage ?? ''} readOnly style={{ width: 200 }} />
            </label>
            <label>
              Credit Limit
              <Input value={(customer.creditLimit ?? '').toString()} readOnly style={{ width: 200 }} />
            </label>
            <label>
              Contact
              <Input value={customer.contact ?? ''} readOnly style={{ width: 200 }} />
            </label>
          </div>
          <div style={{ marginTop: '1em' }}>
            <Link to="/">Back to list</Link>
          </div>
          </form>
        </div>
        <div className="fact-box">
          <div className="fact-section">
            <h4>Summary</h4>
            <p>No. {customer.no}</p>
            <p>{customer.name}</p>
          </div>
          <div className="fact-section">
            <h4>Customer Picture</h4>
            <div className="customer-picture-placeholder" />
          </div>
          <div className="fact-section">
            <h4>Sell-to Customer Sales History</h4>
            <div className="sales-history-placeholder" />
          </div>
        </div>
      </div>
    </div>
  );
}
