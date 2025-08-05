import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Link } from 'react-router-dom';
import { FiSearch, FiPlus, FiEdit, FiTrash2 as FiTrash, FiRefreshCw, FiFilter, FiDownload, FiUpload, FiMoreHorizontal } from 'react-icons/fi';
import { BCRibbon, GlobalHeader, TopNav } from './components/Layout';

import { db, type Customer } from './db';

// Import ag-grid styles first, then our custom styles to override
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './App.css';
import './GridLinkOverride.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

const sampleData: Omit<Customer, 'id'>[] = [
  {
    no: 10000,
    name: 'Adatum Corporation',
    locationCode: 'BLUE',
    address: '192 Market Square',
    city: 'Atlanta',
    state: 'GA',
    zipCode: '31772',
    country: 'US',
    phoneNumber: '425-555-0100',
    mobilePhoneNumber: '425-555-0101',
    email: 'info@adatum.com',
    homePage: 'www.adatum.com',
    creditLimit: 50000,
    contact: 'Robert Townes',
  },
  {
    no: 20000,
    name: 'Trey Research',
    locationCode: 'RED',
    address: '153 Melrose Avenue',
    city: 'Redmond',
    state: 'WA',
    zipCode: '98052',
    country: 'US',
    phoneNumber: '425-555-0150',
    mobilePhoneNumber: '425-555-0151',
    email: 'info@treyresearch.net',
    homePage: 'www.treyresearch.net',
    creditLimit: 75000,
    contact: 'John Hines',
  },
  {
    no: 30000,
    name: 'School of Fine Art',
    locationCode: 'YELLOW',
    address: '1000 Whitfield Dr',
    city: 'Atlanta',
    state: 'GA',
    zipCode: '31772',
    country: 'US',
    phoneNumber: '425-555-0200',
    mobilePhoneNumber: '425-555-0201',
    email: 'admin@schooloffineart.com',
    homePage: 'www.schooloffineart.com',
    creditLimit: 25000,
    contact: 'Jeff Smith',
  },
  {
    no: 40000,
    name: 'Carlson Group',
    locationCode: 'GREEN',
    address: '88 Harbor Road',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98104',
    country: 'US',
    phoneNumber: '425-555-0250',
    mobilePhoneNumber: '425-555-0251',
    email: 'contact@carlsongroup.com',
    homePage: 'www.carlsongroup.com',
    creditLimit: 100000,
    contact: 'Peter Carlson',
  },
  {
    no: 50000,
    name: 'Progressive Home Furnishings',
    locationCode: 'BLUE',
    address: '25 Industrial Boulevard',
    city: 'Miami',
    state: 'FL',
    zipCode: '37135',
    country: 'US',
    phoneNumber: '425-555-0300',
    mobilePhoneNumber: '425-555-0301',
    email: 'sales@progressivehome.com',
    homePage: 'www.progressivehome.com',
    creditLimit: 60000,
    contact: 'Mary Saveley',
  },
  {
    no: 60000,
    name: 'New Concepts Construction',
    locationCode: 'RED',
    address: '456 Riverwood Lane',
    city: 'Chicago',
    state: 'IL',
    zipCode: '61236',
    country: 'US',
    phoneNumber: '425-555-0350',
    mobilePhoneNumber: '425-555-0351',
    email: 'info@newconcepts.com',
    homePage: 'www.newconcepts.com',
    creditLimit: 80000,
    contact: 'Tim Carlson',
  },
];


export default function CustomersPage() {
  const [rowData, setRowData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [columnDefs] = useState<ColDef<Customer>[]>([
    {
      field: 'no',
      headerName: 'No.',
      width: 100,
      pinned: 'left',
      cellRenderer: ({ value }: ICellRendererParams<Customer, number>) => (
        <Link 
          to={`/customer/${value}`} 
          className="grid-link bc-link"
        >
          {value}
        </Link>
      ),
      cellClass: 'number-cell'
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 2,
      minWidth: 200,
      cellRenderer: ({ value, data }: ICellRendererParams<Customer>) => (
        <Link 
          to={`/customer/${data?.no}`} 
          className="grid-link main-link bc-link"
        >
          {value}
        </Link>
      ),
      cellClass: 'name-cell'
    },
    { 
      field: 'contact', 
      headerName: 'Contact',
      width: 160,
      cellClass: 'text-cell',
      cellRenderer: ({ value }: ICellRendererParams<Customer>) => (
        <span className="lookup-field">{value}</span>
      )
    },
    { 
      field: 'locationCode', 
      headerName: 'Location Code',
      width: 120,
      cellClass: 'code-cell'
    },
    { 
      field: 'phoneNumber', 
      headerName: 'Phone No.',
      width: 140,
      cellClass: 'text-cell'
    },
    { 
      field: 'city', 
      headerName: 'City',
      width: 120,
      cellClass: 'text-cell',
      cellRenderer: ({ value }: ICellRendererParams<Customer>) => (
        <span className="drill-down-indicator">{value}</span>
      )
    },
    {
      field: 'creditLimit',
      headerName: 'Credit Limit (LCY)',
      width: 150,
      cellRenderer: ({ value }: ICellRendererParams<Customer, number>) => (
        <span className="currency-value">
          {value ? `${value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}` : ''}
        </span>
      ),
      cellClass: 'amount-cell'
    },
  ]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      await db.transaction('rw', db.customers, async () => {
        const count = await db.customers.count();
        if (count === 0) {
          await db.customers.bulkAdd(sampleData);
        }
        const customers = await db.customers.toArray();
        setRowData(customers);
      });
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <GlobalHeader />
        <TopNav />
      </div>
      <div className="page-content">
        <div className="main-content">
          <div className="page-title-section">
            <h1 className="page-title">Customers</h1>
            <div className="page-subtitle">List</div>
          </div>
          <div className="bc-action-bar">
            <div className="action-bar-left">
              <div className="action-bar-buttons">
                <div className="action-group">
                  <button className="action-button primary">
                    <FiPlus className="icon" />
                    New
                  </button>
                  <button className="action-button">
                    <FiEdit className="icon" />
                    Edit
                  </button>
                  <button className="action-button">
                    <FiTrash className="icon" />
                    Delete
                  </button>
                </div>
                <div className="action-group">
                  <button className="action-button">
                    <FiRefreshCw className="icon" />
                    Refresh
                  </button>
                  <button className="action-button">
                    <FiFilter className="icon" />
                    Filter
                  </button>
                </div>
                <div className="action-group">
                  <button className="action-button">
                    <FiDownload className="icon" />
                    Export
                  </button>
                  <button className="action-button">
                    <FiUpload className="icon" />
                    Import
                  </button>
                  <button className="action-button">
                    <FiMoreHorizontal className="icon" />
                  </button>
                </div>
              </div>
              <div className="record-count">
                {rowData.length} record{rowData.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="action-bar-right">
              <div className="search-container">
                <FiSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search for customers..."
                  className="search-input"
                />
              </div>
            </div>
          </div>
          <div className="list-page-content">
            <div className="list-view-container">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <span>Loading customers...</span>
                </div>
              ) : (
                <div className="grid-container">
                  <AgGridReact 
                    rowData={rowData} 
                    columnDefs={columnDefs} 
                    pagination={false} 
                    className="ag-theme-bc"
                    suppressRowClickSelection={false}
                    rowSelection="single"
                    headerHeight={32}
                    rowHeight={30}
                    animateRows={true}
                    enableRangeSelection={true}
                    suppressMovableColumns={true}
                    domLayout="normal"
                    suppressCellFocus={false}
                    enableCellTextSelection={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="factbox-container">
          <div className="factbox-header">
            <span>Customer FactBox</span>
          </div>
          <div className="factbox-content">
            <div className="factbox-section">
              <div className="factbox-section-header">
                <span>Customer Statistics</span>
              </div>
              <div className="factbox-section-content">
                <div className="factbox-detail-list">
                  <div className="factbox-detail-item">
                    <span className="detail-label">Total Customers:</span>
                    <span className="detail-value">{rowData.length}</span>
                  </div>
                  <div className="factbox-detail-item">
                    <span className="detail-label">Balance (LCY):</span>
                    <span className="detail-value amount">$0.00</span>
                  </div>
                  <div className="factbox-detail-item">
                    <span className="detail-label">Outstanding Orders:</span>
                    <span className="detail-value">0</span>
                  </div>
                  <div className="factbox-detail-item">
                    <span className="detail-label">Shipped Not Invoiced:</span>
                    <span className="detail-value amount">$0.00</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="factbox-section">
              <div className="factbox-section-header">
                <span>Sales History</span>
              </div>
              <div className="factbox-section-content">
                <div className="factbox-chart">
                  <div className="chart-placeholder">
                    <div className="chart-bar" style={{height: '60%'}}></div>
                    <div className="chart-bar" style={{height: '80%'}}></div>
                    <div className="chart-bar" style={{height: '45%'}}></div>
                    <div className="chart-bar" style={{height: '70%'}}></div>
                    <div className="chart-bar" style={{height: '55%'}}></div>
                    <div className="chart-bar" style={{height: '90%'}}></div>
                  </div>
                </div>
                <div className="factbox-detail-list">
                  <div className="factbox-detail-item">
                    <span className="detail-label">This Year:</span>
                    <span className="detail-value amount">$0.00</span>
                  </div>
                  <div className="factbox-detail-item">
                    <span className="detail-label">Last Year:</span>
                    <span className="detail-value amount">$0.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="factbox-section">
              <div className="factbox-section-header">
                <span>Customer Details</span>
              </div>
              <div className="factbox-section-content">
                <div className="factbox-detail-list">
                  <div className="factbox-detail-item">
                    <span className="detail-label">Contact:</span>
                    <span className="detail-value">-</span>
                  </div>
                  <div className="factbox-detail-item">
                    <span className="detail-label">Phone No.:</span>
                    <span className="detail-value">-</span>
                  </div>
                  <div className="factbox-detail-item">
                    <span className="detail-label">Credit Limit:</span>
                    <span className="detail-value amount">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <span className="status-left">Ready</span>
        <span className="status-center">
          {loading ? 'Loading customers...' : `${rowData.length} record${rowData.length !== 1 ? 's' : ''}`}
        </span>
        <span className="status-right">Customers - CRONUS USA, Inc.</span>
      </div>
    </div>
  );
}
