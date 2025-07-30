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
      <div className="content" style={{ padding: '12px' }}>
        <form className="card-form">
          <div className="section">
            <h3>General</h3>
            <label>
              No.
              <Input value={customer.no.toString()} readOnly />
            </label>
            <label>
              Name
              <Input value={customer.name} readOnly />
            </label>
          </div>
          <div className="section">
            <h3>Address and Contact</h3>
            <label>
              Address
              <Input value={customer.address ?? ''} readOnly />
            </label>
            <label>
              City
              <Input value={customer.city ?? ''} readOnly />
            </label>
            <label>
              State
              <Input value={customer.state ?? ''} readOnly />
            </label>
            <label>
              Zip Code
              <Input value={customer.zipCode ?? ''} readOnly />
            </label>
            <label>
              Country
              <Input value={customer.country ?? ''} readOnly />
            </label>
            <label>
              Phone Number
              <Input value={customer.phoneNumber ?? ''} readOnly />
            </label>
            <label>
              Mobile Phone Number
              <Input value={customer.mobilePhoneNumber ?? ''} readOnly />
            </label>
            <label>
              Email
              <Input value={customer.email ?? ''} readOnly />
            </label>
            <label>
              Home Page
              <Input value={customer.homePage ?? ''} readOnly />
            </label>
            <label>
              Credit Limit
              <Input value={(customer.creditLimit ?? '').toString()} readOnly />
            </label>
            <label>
              Contact
              <Input value={customer.contact ?? ''} readOnly />
            </label>
          </div>
          <div style={{ marginTop: '1em', gridColumn: 'span 2' }}>
            <Link to="/">Back to list</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
