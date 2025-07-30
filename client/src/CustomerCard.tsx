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
        <form className="card-form">
          <div className="section">
            <h3>General</h3>
            <label>
              No.
              <input type="text" value={customer.no} readOnly />
            </label>
            <label>
              Name
              <input type="text" value={customer.name} readOnly />
            </label>
          </div>
          <div className="section">
            <h3>Address and Contact</h3>
            <label>
              Address
              <input type="text" value={customer.address ?? ''} readOnly />
            </label>
            <label>
              City
              <input type="text" value={customer.city ?? ''} readOnly />
            </label>
            <label>
              State
              <input type="text" value={customer.state ?? ''} readOnly />
            </label>
            <label>
              Zip Code
              <input type="text" value={customer.zipCode ?? ''} readOnly />
            </label>
            <label>
              Country
              <input type="text" value={customer.country ?? ''} readOnly />
            </label>
            <label>
              Phone Number
              <input type="text" value={customer.phoneNumber ?? ''} readOnly />
            </label>
            <label>
              Mobile Phone Number
              <input type="text" value={customer.mobilePhoneNumber ?? ''} readOnly />
            </label>
            <label>
              Email
              <input type="text" value={customer.email ?? ''} readOnly />
            </label>
            <label>
              Home Page
              <input type="text" value={customer.homePage ?? ''} readOnly />
            </label>
            <label>
              Credit Limit
              <input type="text" value={customer.creditLimit ?? ''} readOnly />
            </label>
            <label>
              Contact
              <input type="text" value={customer.contact ?? ''} readOnly />
            </label>
          </div>
          <div style={{ marginTop: '1em' }}>
            <Link to="/">Back to list</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
