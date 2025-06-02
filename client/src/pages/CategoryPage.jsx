import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Specialties and features
const categories = [
  { icon: "🩺", name: "General Physician", desc: "Routine checkups & common illnesses" },
  { icon: "👶", name: "Pediatrics", desc: "Child health & vaccinations" },
  { icon: "🦷", name: "Dentistry", desc: "Dental care & oral hygiene" },
  { icon: "❤️", name: "Cardiology", desc: "Heart specialists" },
  { icon: "🦴", name: "Orthopedics", desc: "Bone & joint care" },
  { icon: "🌸", name: "Gynecology", desc: "Women's health" },
  { icon: "🧠", name: "Psychiatry", desc: "Mental health support" },
  { icon: "🌞", name: "Dermatology", desc: "Skin, hair & nails" },
  { icon: "👁️", name: "Ophthalmology", desc: "Eye care & vision correction" },
  { icon: "👂", name: "ENT", desc: "Ear, nose & throat specialists" },
  { icon: "🧬", name: "Endocrinology", desc: "Hormonal & metabolic care" },
  { icon: "🩸", name: "Hematology", desc: "Blood disorders & treatment" },
];

const features = [
  { icon: "bi-person-check", title: "Verified Specialists", desc: "All doctors are board-certified and trusted by thousands of patients." },
  { icon: "bi-clock-history", title: "Flexible Appointments", desc: "Book visits at your convenience, including evenings and weekends." },
  { icon: "bi-chat-dots", title: "Easy Communication", desc: "Message or call your doctor directly through our secure platform." },
  { icon: "bi-shield-lock", title: "Privacy & Security", desc: "Your health data is always safe and confidential with us." }
];

const medicineCategories = [
  { name: "All", icon: "🛒" },
  { name: "Pain Relief", icon: "💊" },
  { name: "General", icon: "🧪" },
  { name: "Cold & Flu", icon: "🌡️" },
  { name: "Vitamins", icon: "🧘‍♂️" },
];

const allSpecialties = ["All", ...categories.map(cat => cat.name)];

const CategoryPage = () => {
  // Specialties state
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');

  // Medicines state
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [medicineFilter, setMedicineFilter] = useState('All');
  const [medicineSearch, setMedicineSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const navigate = useNavigate();

  // Fetch medicines from backend
  useEffect(() => {
    fetch('http://localhost:5050/api/medicines')
      .then(res => res.json())
      .then(data => {
        setMedicines(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching medicines:', err);
        setLoading(false);
      });
  }, []);

  // Filtering
  const filteredCategories = categories.filter(cat => {
    const matchesSpecialty = specialty === 'All' || cat.name === specialty;
    const matchesSearch =
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.desc.toLowerCase().includes(search.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const filteredMedicines = medicines.filter(med => {
    const matchesCategory = medicineFilter === 'All' || med.category === medicineFilter;
    const matchesSearch =
      med.name.toLowerCase().includes(medicineSearch.toLowerCase()) ||
      (med.category && med.category.toLowerCase().includes(medicineSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Cart logic
  const addToCart = (medicine) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item._id === medicine._id);
      if (existing) {
        setToastMessage(`${medicine.name} quantity updated in cart!`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
        return prevCart.map(item =>
          item._id === medicine._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      setToastMessage(`${medicine.name} added to cart!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return [...prevCart, { ...medicine, quantity: 1 }];
    });
  };

  const removeFromCart = (medicineId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== medicineId));
    setToastMessage(`Medicine removed from cart.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const updateQuantity = (medicineId, delta) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === medicineId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Medicine details modal
  const MedicineModal = ({ medicine, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={medicine.image} alt={medicine.name} style={{ width: 120, borderRadius: 8 }} />
        <h3>{medicine.name}</h3>
        <p><strong>Category:</strong> {medicine.category}</p>
        <p><strong>Dosage:</strong> {medicine.dosage}</p>
        <p><strong>Symptoms:</strong> {medicine.symptoms}</p>
        <p><strong>Description:</strong> {medicine.description}</p>
        <p><strong>Price:</strong> ₹{medicine.price?.toFixed(2)}</p>
        <button className="btn btn-primary" onClick={() => { addToCart(medicine); onClose(); }}>Add to Cart</button>
        <button className="btn btn-secondary" onClick={onClose} style={{ marginLeft: 8 }}>Close</button>
      </div>
    </div>
  );

  // Proceed to payment
  const handleProceedToPayment = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/payment');
  };

  return (
    <div className="category-page">
      {/* Toast Notification */}
      {showToast && (
        <div className="toast">
          <div className="toast-body">{toastMessage}</div>
        </div>
      )}

      {/* Hero Section */}
      <section className="category-hero">
        <h1>
          Find Your <span className="medicare-highlight">Specialist</span>
        </h1>
        <p>
          Discover top medical specialists for every health need. Browse, search, and book appointments with trusted experts in every field.
        </p>
      </section>

      {/* Features Section */}
      <section className="category-features">
        <div className="category-features-grid">
          {features.map((f, idx) => (
            <div className="category-feature-card" key={idx}>
              <i className={`bi ${f.icon} feature-icon`}></i>
              <h5>{f.title}</h5>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Filter */}
      <section className="category-search-filter">
        <input
          type="text"
          className="category-search"
          placeholder="Search specialties..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="category-filter"
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
        >
          {allSpecialties.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </section>

      {/* Specialties Grid */}
      <section className="medicare-categories">
        <div className="category-section-header">
          <h2 className="category-section-title">Browse by Specialty</h2>
          <span className="category-section-count">
            {filteredCategories.length} specialties found
          </span>
        </div>
        {filteredCategories.length === 0 ? (
          <div className="category-empty">
            <i className="bi bi-emoji-frown" style={{ fontSize: "2rem" }}></i>
            <p>No specialties found. Try a different search or filter.</p>
          </div>
        ) : (
          <div className="medicare-categories-scroll">
            <div className="medicare-categories-grid">
              {filteredCategories.map((cat, idx) => (
                <div className="medicare-category-card" key={idx}>
                  <div className="medicare-category-icon">{cat.icon}</div>
                  <h4>{cat.name}</h4>
                  <p className="medicare-category-desc">{cat.desc}</p>
                  <Link
                    to={`/doctors?specialty=${encodeURIComponent(cat.name)}`}
                    className="btn category-btn mt-auto"
                  >
                    <i className="bi bi-person-lines-fill me-1"></i>
                    View Doctors
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Medicines Section */}
      <section className="medicines-section">
        <h2>Medicines</h2>
        <div className="medicine-filter-bar">
          <input
            type="text"
            placeholder="Search medicines..."
            value={medicineSearch}
            onChange={e => setMedicineSearch(e.target.value)}
          />
          {medicineCategories.map(cat => (
            <button
              key={cat.name}
              className={`category-btn${medicineFilter === cat.name ? ' selected' : ''}`}
              onClick={() => setMedicineFilter(cat.name)}
            >
              <span style={{ marginRight: 6 }}>{cat.icon}</span>{cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div>Loading medicines...</div>
        ) : (
          <div className="medicines-grid">
            {filteredMedicines.length === 0 && <div>No medicines found.</div>}
            {filteredMedicines.map(med => (
              <div key={med._id} className="medicine-card">
                <img
                  src={med.image}
                  alt={med.name}
                  onClick={() => setSelectedMedicine(med)}
                />
                <h4>{med.name}</h4>
                <p className="medicine-desc">{med.description}</p>
                <div className="medicine-price">₹{med.price?.toFixed(2)}</div>
                <button className="btn btn-primary" onClick={() => addToCart(med)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Cart summary */}
        <div className="cart-section">
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <div>No items in cart.</div>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item._id} className="cart-item-row">
                  <span>{item.name}</span>
                  <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                  <span style={{ width: 60, textAlign: 'right' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                  <button style={{ marginLeft: 12 }} onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              ))}
              <div className="cart-total">
                Total: ₹{cartTotal.toFixed(2)}
              </div>
              <button
                className="btn btn-success cart-proceed-btn"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          )}
        </div>

        {/* Medicine details modal */}
        {selectedMedicine && (
          <MedicineModal medicine={selectedMedicine} onClose={() => setSelectedMedicine(null)} />
        )}
      </section>

      {/* Call to Action */}
      <section className="category-cta">
        <h3>Not sure which specialist you need?</h3>
        <p>
          <Link to="/contact" className="category-cta-link">
            Contact us
          </Link> and we’ll help you find the right doctor!
        </p>
      </section>
    </div>
  );
};

export default CategoryPage;
