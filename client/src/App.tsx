import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import CustomersPage from './CustomersPage';
import CustomerCard from './CustomerCard';

export default function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomersPage />} />
          <Route path="/customer/:no" element={<CustomerCard />} />
        </Routes>
      </BrowserRouter>
    </FluentProvider>
  );
}
