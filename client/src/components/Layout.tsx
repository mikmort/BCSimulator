import { FaTh, FaUser } from 'react-icons/fa';
import {
  FiSettings,
  FiSearch,
  FiHelpCircle,
  FiPlus,
  FiEdit,
  FiTrash,
  FiCopy,
  FiSend,
  FiRefreshCw,
  FiFilter,
  FiDownload,
  FiUpload,
  FiFileText,
  FiList,
  FiMoreHorizontal,
} from 'react-icons/fi';
import '../App.css';

export function GlobalHeader() {
  return (
    <div className="global-header">
      <div className="header-left">
        <div className="app-launcher">
          <FaTh className="launcher-icon" />
        </div>
        <div className="header-brand">
          <span className="brand-text">Microsoft Dynamics 365 Business Central</span>
        </div>
      </div>
      <div className="header-center">
        <div className="global-search-container">
          <FiSearch className="global-search-icon" />
          <input 
            type="text" 
            placeholder="Tell me what you want to do"
            className="global-search-input"
          />
        </div>
      </div>
      <div className="header-right">
        <div className="header-icon-group">
          <FiHelpCircle className="header-icon" title="Help" />
          <FiSettings className="header-icon" title="Settings" />
          <div className="user-menu">
            <FaUser className="user-icon" />
            <span className="user-name">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TopNav() {
  return (
    <nav className="top-nav">
      <div className="nav-breadcrumb">
        <span className="company-name">CRONUS USA, Inc.</span>
        <span className="breadcrumb-separator">›</span>
        <span className="current-area">Sales</span>
      </div>
      <div className="nav-menu">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">Finance</a>
        <a href="#" className="nav-link active">Sales</a>
        <a href="#" className="nav-link">Purchasing</a>
        <a href="#" className="nav-link">Inventory</a>
        <a href="#" className="nav-link">Projects</a>
        <a href="#" className="nav-link">Administration</a>
      </div>
      <div className="nav-actions">
        <button className="nav-action-btn">
          <FiSearch size={14} />
        </button>
      </div>
    </nav>
  );
}

export function BCRibbon({ title }: { title: string }) {
  return (
    <>
      <div className="page-title-section">
        <h1 className="page-title">{title}</h1>
        <div className="page-subtitle">List</div>
      </div>
      <div className="bc-action-bar">
        <div className="action-bar-left">
          <div className="action-bar-buttons">
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
            <div className="action-divider" />
            <button className="action-button">
              <FiList className="icon" />
              Manage
            </button>
            <button className="action-button">
              <FiCopy className="icon" />
              Copy
            </button>
            <div className="action-divider" />
            <button className="action-button">
              <FiSend className="icon" />
              Process
            </button>
            <button className="action-button">
              <FiFileText className="icon" />
              Reports
            </button>
            <div className="action-divider" />
            <button className="action-button">
              <FiFilter className="icon" />
              Filter
            </button>
            <button className="action-button">
              <FiRefreshCw className="icon" />
              Refresh
            </button>
            <div className="action-divider" />
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
      </div>
    </>
  );
}

// Keep the old ActionBar for backward compatibility
export function ActionBar({ title }: { title: string }) {
  return <BCRibbon title={title} />;
}
