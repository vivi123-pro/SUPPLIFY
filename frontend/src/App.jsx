// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import LoginMessage from './pages/LoginMessage';
import ProductDetail from './pages/ProductDetail';
import WasteMarketplace from './pages/WasteMarketplace';
import WasteDetail from './pages/WasteDetail';
import Orders from './pages/Orders';
import UploadProduct from './pages/UploadProduct';
import UploadWaste from './pages/UploadWaste';

// Simple Auth Context (minimal implementation)
const AuthContext = React.createContext();

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check if user is logged in (simulate auth check)
    const savedUser = localStorage.getItem('supplify_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'business@supplify.ng' && password === 'password') {
          const userData = {
            id: '1',
            name: 'John Business',
            email: email,
            businessName: 'Prime Manufacturing Ltd',
            type: 'premium'
          };
          setUser(userData);
          localStorage.setItem('supplify_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = async (userData) => {
    // Simulate registration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('supplify_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
        // Update App.js routes section
<Routes>
  {/* Public Routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login-message" element={<LoginMessage />} />
  
  {/* Protected Routes with Layout */}
  <Route path="/" element={<Home />} />
  <Route path="/product/:id" element={<ProductDetail />} />
  <Route path="/waste-marketplace" element={<WasteMarketplace />} />
  <Route path="/waste/:id" element={<WasteDetail />} />
  <Route path="/orders" element={<Orders />} />
  
  {/* New Upload Routes */}
  <Route path="/upload-product" element={<UploadProduct />} />
  <Route path="/upload-waste" element={<UploadWaste />} />
  
  {/* 404 Fallback */}
  <Route path="*" element={<NotFound />} />
</Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Simple 404 Component
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8">Page not found</p>
        <a 
          href="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default App;