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
    phoneNumber: '555-0100',
    contact: 'Mark Hens',
  },
  {
    no: 20000,
    name: 'Coho Winery',
    locationCode: 'RED',
    phoneNumber: '555-0150',
    contact: 'Cindy Fox',
  },
  {
    no: 30000,
    name: 'Relecloud',
    locationCode: 'DEN',
    phoneNumber: '555-0200',
    contact: 'Keith Harris',
  },
  {
    no: 40000,
    name: 'A Datum Corporation',
    locationCode: 'CHI',
    phoneNumber: '555-0250',
    contact: 'Sue Black',
  },
  {
    no: 50000,
    name: 'Contoso Ltd.',
    locationCode: 'AUS',
    phoneNumber: '555-0300',
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
