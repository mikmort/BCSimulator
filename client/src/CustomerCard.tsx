import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Input } from '@fluentui/react-components';
import { FiArrowLeft, FiChevronDown, FiChevronRight, FiUser, FiMapPin, FiPhone, FiMail, FiGlobe, FiDollarSign } from 'react-icons/fi';
import { db, type Customer } from './db';
import { BCRibbon, GlobalHeader, TopNav } from './components/Layout';
import './App.css';

interface FastTabProps {
  title: string;
  icon?: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FastTab({ title, icon, isExpanded, onToggle, children }: FastTabProps) {
  return (
    <div className="fasttab">
      <div className="fasttab-header" onClick={onToggle}>
        <div className="fasttab-header-content">
          <div className="fasttab-icon">
            {isExpanded ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
          </div>
          {icon && <div className="fasttab-section-icon">{icon}</div>}
          <span className="fasttab-title">{title}</span>
        </div>
      </div>
      {isExpanded && (
        <div className="fasttab-content">
          {children}
        </div>
      )}
    </div>
  );
}

export default function CustomerCard() {
  const { no } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [expandedTabs, setExpandedTabs] = useState({
    general: true,
    address: false,
    communication: false,
    invoicing: false,
    payments: false,
    shipping: false
  });

  const toggleTab = (tabName: keyof typeof expandedTabs) => {
    setExpandedTabs(prev => ({
      ...prev,
      [tabName]: !prev[tabName]
    }));
  };

  useEffect(() => {
    if (!no) return;
    const n = parseInt(no, 10);
    db.customers.where('no').equals(n).first().then((c) => setCustomer(c ?? null));
  }, [no]);

  if (!customer) {
    return (
      <div className="page-container">
        <div className="page-header">
          <GlobalHeader />
          <TopNav />
        </div>
        <div className="page-content">
          <div className="main-content">
            <BCRibbon title="Customer Card" />
            <div className="loading-container">
              Loading customer information...
            </div>
          </div>
        </div>
        <div className="status-bar">
          <span>Loading...</span>
          <span>Please wait</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <GlobalHeader />
        <TopNav />
      </div>
      <div className="page-content">
        <div className="main-content">
          <div className="page-title-section">
            <h1 className="page-title">Customer Card</h1>
            <div className="page-subtitle">{customer.name}</div>
          </div>
          <div className="bc-action-bar">
            <div className="action-bar-left">
              <div className="action-bar-buttons">
                <button className="action-button">
                  <FiUser className="icon" />
                  Edit
                </button>
                <button className="action-button">
                  <FiMail className="icon" />
                  Email
                </button>
                <button className="action-button">
                  <FiPhone className="icon" />
                  Call
                </button>
                <div className="action-divider" />
                <button className="action-button">
                  <FiDollarSign className="icon" />
                  Ledger Entries
                </button>
                <button className="action-button">
                  <FiGlobe className="icon" />
                  Navigate
                </button>
              </div>
            </div>
          </div>
          <div className="card-page-content">
            <div className="card-navigation">
              <Link to="/" className="back-button">
                <FiArrowLeft />
                Back to Customer List
              </Link>
            </div>
            
            <div className="card-container">
              <div className="card-header-section">
                <div className="card-header-fields">
                  <div className="field-group">
                    <label className="field-label">No.</label>
                    <Input 
                      value={customer.no.toString()} 
                      readOnly 
                      className="header-field"
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Name</label>
                    <Input 
                      value={customer.name} 
                      readOnly 
                      className="header-field name-field"
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Location Code</label>
                    <Input 
                      value={customer.locationCode ?? ''} 
                      readOnly 
                      className="header-field"
                    />
                  </div>
                </div>
              </div>

              <div className="fasttabs-container">
                <FastTab 
                  title="General" 
                  icon={<FiUser size={16} />}
                  isExpanded={expandedTabs.general}
                  onToggle={() => toggleTab('general')}
                >
                  <div className="field-grid">
                    <div className="field-group">
                      <label className="field-label">Contact</label>
                      <Input value={customer.contact ?? ''} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Phone No.</label>
                      <Input value={customer.phoneNumber ?? ''} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Search Name</label>
                      <Input value={customer.name.toUpperCase()} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Customer Posting Group</label>
                      <Input value="DOMESTIC" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Gen. Bus. Posting Group</label>
                      <Input value="DOMESTIC" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">VAT Bus. Posting Group</label>
                      <Input value="DOMESTIC" readOnly />
                    </div>
                  </div>
                </FastTab>

                <FastTab 
                  title="Address & Contact" 
                  icon={<FiMapPin size={16} />}
                  isExpanded={expandedTabs.address}
                  onToggle={() => toggleTab('address')}
                >
                  <div className="field-grid">
                    <div className="field-group">
                      <label className="field-label">Address</label>
                      <Input value={customer.address ?? ''} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Address 2</label>
                      <Input value="" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">City</label>
                      <Input value={customer.city ?? ''} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">State</label>
                      <Input value={customer.state ?? ''} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">ZIP Code</label>
                      <Input value={customer.zipCode ?? ''} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Country/Region Code</label>
                      <Input value={customer.country ?? ''} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Phone No.</label>
                      <Input value={customer.phoneNumber ?? ''} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Mobile Phone No.</label>
                      <Input value={customer.mobilePhoneNumber ?? ''} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Email</label>
                      <Input value={customer.email ?? ''} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Fax No.</label>
                      <Input value="" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Home Page</label>
                      <Input value={customer.homePage ?? ''} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Language Code</label>
                      <Input value="ENU" readOnly />
                    </div>
                  </div>
                </FastTab>

                <FastTab 
                  title="Invoicing" 
                  icon={<FiDollarSign size={16} />}
                  isExpanded={expandedTabs.invoicing}
                  onToggle={() => toggleTab('invoicing')}
                >
                  <div className="field-grid">
                    <div className="field-group">
                      <label className="field-label">Bill-to Customer No.</label>
                      <Input value={customer.no.toString()} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Invoice Disc. Code</label>
                      <Input value="" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Customer Price Group</label>
                      <Input value="" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Customer Disc. Group</label>
                      <Input value="" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Allow Line Disc.</label>
                      <Input value="Yes" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Prices Including VAT</label>
                      <Input value="No" readOnly />
                    </div>
                  </div>
                </FastTab>

                <FastTab 
                  title="Payments" 
                  icon={<FiDollarSign size={16} />}
                  isExpanded={expandedTabs.payments}
                  onToggle={() => toggleTab('payments')}
                >
                  <div className="field-grid">
                    <div className="field-group">
                      <label className="field-label">Payment Terms Code</label>
                      <Input value="30 DAYS" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Payment Method Code</label>
                      <Input value="CHECK" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Credit Limit (LCY)</label>
                      <Input value={customer.creditLimit ? `$${customer.creditLimit.toLocaleString()}` : ''} readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Blocked</label>
                      <Input value="" readOnly />
                    </div>
                  </div>
                </FastTab>

                <FastTab 
                  title="Shipping" 
                  icon={<FiMapPin size={16} />}
                  isExpanded={expandedTabs.shipping}
                  onToggle={() => toggleTab('shipping')}
                >
                  <div className="field-grid">
                    <div className="field-group">
                      <label className="field-label">Ship-to Code</label>
                      <Input value="" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Shipment Method Code</label>
                      <Input value="UPS" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Shipping Agent Code</label>
                      <Input value="" readOnly />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Shipping Time</label>
                      <Input value="5D" readOnly />
                    </div>
                  </div>
                </FastTab>
              </div>
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
                <span>Customer Details</span>
              </div>
              <div className="factbox-section-content">
                <div className="factbox-detail-list">
                  <div className="factbox-detail-item">
                    <span className="detail-label">No.:</span>
                    <span className="detail-value">{customer.no}</span>
                  </div>
                  <div className="factbox-detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{customer.name}</span>
                  </div>
                  <div className="factbox-detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{customer.locationCode || 'N/A'}</span>
                  </div>
                  <div className="factbox-detail-item">
                    <span className="detail-label">Contact:</span>
                    <span className="detail-value">{customer.contact || 'N/A'}</span>
                  </div>
                  <div className="factbox-detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{customer.phoneNumber || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="factbox-section">
              <div className="factbox-section-header">
                <span>Customer Statistics</span>
              </div>
              <div className="factbox-section-content">
                <div className="factbox-detail-list">
                  <div className="factbox-detail-item">
                    <span className="detail-label">Balance (LCY):</span>
                    <span className="detail-value amount">$0.00</span>
                  </div>
                  <div className="factbox-detail-item">
                    <span className="detail-label">Credit Limit (LCY):</span>
                    <span className="detail-value amount">
                      {customer.creditLimit ? `$${customer.creditLimit.toLocaleString()}` : '$0.00'}
                    </span>
                  </div>
                  <div className="factbox-detail-item">
                    <span className="detail-label">Total Sales (LCY):</span>
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
                <span>Customer Picture</span>
              </div>
              <div className="factbox-section-content">
                <div className="customer-picture-placeholder">
                  No image available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <span>Ready</span>
        <span>Customer {customer.no} - {customer.name}</span>
      </div>
    </div>
  );
}
