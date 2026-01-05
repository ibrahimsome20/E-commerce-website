import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <div className="text-center mt-20">Please login to view this page</div>;
};

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-slate-50">
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={
            <PrivateRoute><CartPage /></PrivateRoute>
          } />
          <Route path="/orders" element={
            <PrivateRoute><OrderPage /></PrivateRoute>
          } />
        </Routes>
      </main>
      <footer className="bg-tokyo-bg text-center py-4 text-sm text-gray-400">
        © 2024 TokyoStore. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
