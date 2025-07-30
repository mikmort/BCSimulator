import { FaTh } from 'react-icons/fa';
import {
  FiSettings,
  FiSearch,
  FiHelpCircle,
  FiPlus,
  FiTrash,
} from 'react-icons/fi';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
} from '@fluentui/react-components';
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
        <Toolbar aria-label={`${title} actions`} size="large" className="toolbar">
          <ToolbarButton icon={<FiPlus />} vertical>
            New
          </ToolbarButton>
          <ToolbarButton icon={<FiTrash />} vertical>
            Delete
          </ToolbarButton>
          <ToolbarDivider />
          <ToolbarButton vertical>Home</ToolbarButton>
        </Toolbar>
      </div>
    </div>
  );
}
