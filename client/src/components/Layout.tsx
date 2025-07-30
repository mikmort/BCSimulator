import { FaTh } from 'react-icons/fa';
import {
  FiSettings,
  FiSearch,
  FiHelpCircle,
  FiPlus,
  FiTrash,
} from 'react-icons/fi';
import { Button } from '@fluentui/react-components';
import '../App.css';

export function GlobalHeader() {
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

export function TopNav() {
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

export function ActionBar({ title }: { title: string }) {
  return (
    <div className="action-bar">
      <div className="left-section">
        <span className="page-title">{title}</span>
        <div className="toolbar">
          <Button icon={<FiPlus />} appearance="secondary">
            New
          </Button>
          <Button icon={<FiTrash />} appearance="secondary">
            Delete
          </Button>
          <Button appearance="secondary">Home</Button>
        </div>
      </div>
    </div>
  );
}
