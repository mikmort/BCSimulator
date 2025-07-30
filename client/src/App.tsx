import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);
import { FaTh } from 'react-icons/fa';
import { FiSettings, FiSearch, FiHelpCircle } from 'react-icons/fi';
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

function GlobalHeader() {
  return (
    <div className="global-header">
      <div className="header-left">
        <FaTh className="icon" />
        <span className="title">Dynamics Business Central</span>
      </div>
      <div className="header-right">
        <FiSearch className="icon" />
        <FiSettings className="icon" />
        <FiHelpCircle className="icon" />
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <div className="top-nav">
      <span className="company">Cronus USA, Inc.</span>
      <nav>
        <a href="#">Finance</a>
        <a href="#">Cash Management</a>
        <a href="#">Sales</a>
        <a href="#">Purchasing</a>
      </nav>
    </div>
  );
}

function ActionBar() {
  return (
    <div className="action-bar">
      <span className="page-title">Customers</span>
      <div className="toolbar">
        <button>New</button>
        <button>Delete</button>
        <button>Home</button>
      </div>
    </div>
  );
}

export default function App() {
  const [rowData, setRowData] = useState<Customer[]>([]);
  const [columnDefs] = useState<ColDef<Customer>[]>([
    { field: 'no', headerName: 'No.' },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'locationCode', headerName: 'Location Code' },
    { field: 'phoneNumber', headerName: 'Phone Number' },
    { field: 'contact', headerName: 'Contact' },
  ]);

  useEffect(() => {
    async function load() {
      const count = await db.customers.count();
      if (count === 0) {
        await db.customers.bulkAdd(sampleData);
      }
      const customers = await db.customers.toArray();
      setRowData(customers);
    }
    load();
  }, []);

  return (
    <div className="app-container">
      <GlobalHeader />
      <TopNav />
      <ActionBar />
      <div className="content">
        <div className="grid ag-theme-alpine">
          <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={false} />
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
