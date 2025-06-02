import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Sample data (replace with your own data or API call)
const medicines = [ 
  {
    id: 1,
    name: "Paracetamol",
    category: "Pain Relief",
    price: 15.99,
    image: "https://m.media-amazon.com/images/I/71LpYw+3+BL._SL1500_.jpg",
    stock: 100,
    description: "Relieves pain and reduces fever. Suitable for adults and children."
  },
  {
    id: 2,
    name: "Ibuprofen",
    category: "Pain Relief",
    price: 18.99,
    image: "https://m.media-amazon.com/images/I/61lJ3cG0yVL._SL1500_.jpg",
    stock: 80,
    description: "Reduces inflammation, pain, and fever."
  },
  {
    id: 3,
    name: "Vitamin C",
    category: "Vitamins",
    price: 12.99,
    image: "https://m.media-amazon.com/images/I/61GmR3sWbOL._SL1500_.jpg",
    stock: 120,
    description: "Boosts immunity and supports overall health."
  },
  {
    id: 4,
    name: "Cetirizine",
    category: "General",
    price: 14.99,
    image: "https://m.media-amazon.com/images/I/71LpYw+3+BL._SL1500_.jpg",
    stock: 90,
    description: "Relieves allergy symptoms such as sneezing and itching."
  },
  {
    id: 5,
    name: "Cold & Flu Syrup",
    category: "Cold & Flu",
    price: 19.99,
    image: "https://m.media-amazon.com/images/I/61GmR3sWbOL._SL1500_.jpg",
    stock: 60,
    description: "Relieves symptoms of cold and flu."
  }
];

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const med = medicines.find(m => m.id.toString() === id);
    if (med) {
      setMedicine(med);
    } else {
      navigate('/not-found');
    }
  }, [id, navigate]);

  if (!medicine) return <div className="medicine-loading">Loading...</div>;

  const addToCart = () => {
    alert(`${quantity} ${medicine.name} added to cart!`);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="medicine-detail-page">
      
      <main className="container">
        <div className="medicine-detail-card">
          <div className="medicine-detail-img">
            <img src={medicine.image} alt={medicine.name} />
          </div>
          <div className="medicine-detail-info">
            <h2>{medicine.name}</h2>
            <p className="medicine-category">{medicine.category}</p>
            <p className="medicine-price">₹{medicine.price.toFixed(2)}</p>
            <p className="medicine-stock">{medicine.stock} available</p>
            <p className="medicine-description">{medicine.description}</p>
            <div className="medicine-detail-actions">
              <div className="quantity-selector">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button
                className="btn btn-primary"
                onClick={addToCart}
                disabled={addedToCart}
              >
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default MedicineDetail;
