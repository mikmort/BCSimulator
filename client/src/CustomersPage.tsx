import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);
import { Link } from 'react-router-dom';
import { ActionBar, GlobalHeader, TopNav } from './components/Layout';
import './App.css';

import { db, type Customer } from './db';

const sampleData: Omit<Customer, 'id'>[] = [
  {
    no: 10000,
    name: 'Trey Research',
    locationCode: 'SEA',
    address: '123 Main St.',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    country: 'US',
    phoneNumber: '555-0100',
    mobilePhoneNumber: '555-0101',
    email: 'info@treyresearch.com',
    homePage: 'treyresearch.com',
    creditLimit: 5000,
    contact: 'Mark Hens',
  },
  {
    no: 20000,
    name: 'Coho Winery',
    locationCode: 'RED',
    address: '456 Vine St.',
    city: 'Redmond',
    state: 'WA',
    zipCode: '98052',
    country: 'US',
    phoneNumber: '555-0150',
    mobilePhoneNumber: '555-0151',
    email: 'info@cohowinery.com',
    homePage: 'cohowinery.com',
    creditLimit: 7000,
    contact: 'Cindy Fox',
  },
  {
    no: 30000,
    name: 'Relecloud',
    locationCode: 'DEN',
    address: '789 Cloud Way',
    city: 'Denver',
    state: 'CO',
    zipCode: '80202',
    country: 'US',
    phoneNumber: '555-0200',
    mobilePhoneNumber: '555-0201',
    email: 'info@relecloud.com',
    homePage: 'relecloud.com',
    creditLimit: 8000,
    contact: 'Keith Harris',
  },
  {
    no: 40000,
    name: 'A Datum Corporation',
    locationCode: 'CHI',
    address: '321 Industrial Rd.',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    country: 'US',
    phoneNumber: '555-0250',
    mobilePhoneNumber: '555-0251',
    email: 'info@adatum.com',
    homePage: 'adatum.com',
    creditLimit: 10000,
    contact: 'Sue Black',
  },
  {
    no: 50000,
    name: 'Contoso Ltd.',
    locationCode: 'AUS',
    address: '654 Market St.',
    city: 'Austin',
    state: 'TX',
    zipCode: '73301',
    country: 'US',
    phoneNumber: '555-0300',
    mobilePhoneNumber: '555-0301',
    email: 'info@contoso.com',
    homePage: 'contoso.com',
    creditLimit: 12000,
    contact: 'Steven White',
  },
];


export default function CustomersPage() {
  const [rowData, setRowData] = useState<Customer[]>([]);
  const [columnDefs] = useState<ColDef<Customer>[]>([
    {
      field: 'no',
      headerName: 'No.',
      cellRenderer: ({ value }: ICellRendererParams<Customer, number>) => (
        <Link to={`/customer/${value}`}>{value}</Link>
      ),
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'locationCode', headerName: 'Location Code' },
    { field: 'phoneNumber', headerName: 'Phone Number' },
    { field: 'contact', headerName: 'Contact' },
  ]);

  useEffect(() => {
    async function load() {
      await db.transaction('rw', db.customers, async () => {
        const count = await db.customers.count();
        if (count === 0) {
          await db.customers.bulkAdd(sampleData);
        }
        const customers = await db.customers.toArray();
        setRowData(customers);
      });
    }
    load();
  }, []);

  return (
    <div className="app-container">
      <GlobalHeader />
      <TopNav />
      <ActionBar title="Customers" />
      <div className="content">
        <div className="grid ag-theme-alpine">
          <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={false} theme="legacy" />
        </div>
        <div className="info-card">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="info-square" />
          ))}
        </div>
      </div>
    </div>
  );
}
