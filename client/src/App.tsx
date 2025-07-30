import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from "ag-grid-community";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaTh } from 'react-icons/fa';
import { FiSettings, FiSearch, FiHelpCircle } from 'react-icons/fi';
import './App.css';

interface Customer {
  id: number;
  name: string;
  city: string;
  balance: number;
}

const sampleData: Customer[] = [
  { id: 10000, name: 'Trey Research', city: 'Seattle', balance: 3000 },
  { id: 20000, name: 'Coho Winery', city: 'Redmond', balance: 2500 },
  { id: 30000, name: 'Relecloud', city: 'Denver', balance: 1200 },
  { id: 40000, name: 'A Datum Corporation', city: 'Chicago', balance: 4100 },
  { id: 50000, name: 'Contoso Ltd.', city: 'Austin', balance: 980 },
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
  const [rowData] = useState(sampleData);
  const [columnDefs] = useState<ColDef<Customer>[]>([
    { field: 'id', headerName: 'No.' },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'city', headerName: 'City' },
    {
      field: 'balance',
      headerName: 'Balance',
      valueFormatter: (p: { value: number }) => `$${p.value.toFixed(2)}`,
    },
  ]);

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
