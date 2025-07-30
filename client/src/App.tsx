import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomersPage from './CustomersPage';
import CustomerCard from './CustomerCard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomersPage />} />
        <Route path="/customer/:no" element={<CustomerCard />} />
      </Routes>
    </BrowserRouter>
  );
}
