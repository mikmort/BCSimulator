import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Field, Input } from '@fluentui/react-components';
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
          <Field label="No.">
            <Input value={String(customer.no)} readOnly />
          </Field>
          <Field label="Name">
            <Input value={customer.name} readOnly />
          </Field>
          <Field label="Location Code">
            <Input value={customer.locationCode} readOnly />
          </Field>
          <Field label="Phone Number">
            <Input value={customer.phoneNumber} readOnly />
          </Field>
          <Field label="Contact">
            <Input value={customer.contact} readOnly />
          </Field>
          <div style={{ marginTop: '1em' }}>
            <Link to="/">Back to list</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
