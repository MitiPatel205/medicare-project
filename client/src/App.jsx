import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DoctorPage from './pages/DoctorPage';
import BookingPage from './pages/BookingPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import Testimonial from './pages/Testimonial';
import CategoryPage from './pages/CategoryPage';
import UserDashboard from './pages/UserDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WritePrescription from './pages/WritePrescription';
import ViewPatients from './pages/ViewPatients';
import MedicineDetail from './pages/MedicineDetail';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import ShippingPage from './pages/ShippingPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/testimonials" element={<Testimonial />} />
          {/* Pass cart and setCart to CategoryPage */}
          <Route path="/categories" element={<CategoryPage cart={cart} setCart={setCart} />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patients" element={<ViewPatients />} />
          <Route path="/prescriptions" element={<WritePrescription />} />
          <Route path="/medicine/:id" element={<MedicineDetail />} />
          {/* Cart, Payment, and Shipping pages need cart (and setCart if you want to clear it after order) */}
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
          <Route path="/payment" element={<PaymentPage cart={cart} setCart={setCart} />} />
          <Route path="/shipping" element={<ShippingPage cart={cart} setCart={setCart} />} />
          <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
