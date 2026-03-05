import React, { useState, useEffect } from 'react';
import './App.css';

// Define types
interface Product {
  id: number;
  name: string;
  category: string;
  featured: boolean;
}

interface CartItem {
  name: string;
  category: string;
}

const App = () => {
  // State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signedInName, setSignedInName] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedBookingType, setSelectedBookingType] = useState('live');
  const [isMeasurementsOpen, setIsMeasurementsOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Sample product data
  const products: Product[] = [
    { id: 1, name: 'The Grand Drape', category: 'kaftan', featured: true },
    { id: 2, name: 'The Senator Cut', category: 'ankara', featured: false },
    { id: 3, name: 'Sovereign Stitch', category: 'embroidery', featured: false },
    { id: 4, name: 'The Crisp Classic', category: 'shirt', featured: false },
    { id: 5, name: 'The Clean Break', category: 'trouser', featured: false },
    { id: 6, name: 'The Crown', category: 'cap', featured: false },
    { id: 7, name: 'The Boundary Layer', category: 'shacket', featured: false },
    { id: 8, name: 'Agbada Reborn', category: 'ankara', featured: false },
  ];

  // Cart functions
  const addToCart = (name: string, category: string) => {
    if (cart.find(item => item.name === name)) {
      showToast('Already in order');
      return;
    }
    setCart([...cart, { name, category }]);
    showToast(`${name} added to order`);
    openCart();
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const submitOrder = () => {
    setCart([]);
    showToast('Order submitted!');
    closeCart();
  };

  // Toast
  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  // Filter products
  const filterProducts = (category: string) => {
    setActiveFilter(category);
  };

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  // Booking
  const selectBookingOption = (type: string) => {
    setSelectedBookingType(type);
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.querySelector('#book-name') as HTMLInputElement)?.value;
    if (!name) {
      showToast('Please enter your name');
      return;
    }
    showToast('Booking request received!');
  };

  // Measurements
  const toggleMeasurements = () => {
    setIsMeasurementsOpen(!isMeasurementsOpen);
  };

  const submitMeasurements = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Measurements saved!');
  };

  // Auth
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.querySelector('input[type="email"]') as HTMLInputElement)?.value;
    setIsSignedIn(true);
    setSignedInName(email ? email.split('@')[0] : 'Guest');
    closeModal();
    showToast('Signed in successfully!');
  };

  const signOut = () => {
    setIsSignedIn(false);
    setSignedInName('');
    showToast('Signed out');
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 50) {
          nav.style.background = 'rgba(255, 255, 255, 0.95)';
          nav.style.boxShadow = '0 4px 20px rgba(37, 99, 235, 0.08)';
        } else {
          nav.style.background = 'rgba(255, 255, 255, 0.9)';
          nav.style.boxShadow = 'none';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function for safe element selection
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav>
        <a href="#" className="nav-logo">
          Blanco Ortega
          <span>For The Elite Man</span>
        </a>
        <ul className="nav-links">
          <li><a href="#catalogue">Catalogue</a></li>
          <li><a href="#services">Get With Us</a></li>
          <li><a href="#booking">Book a Fitting</a></li>
        </ul>
        <div className="nav-right">
          <div className="cart-indicator" onClick={openCart}>
            <span>Cart</span>
            <span className="cart-count">{cart.length}</span>
          </div>
          <a href="#" className="sign-in" onClick={(e) => { e.preventDefault(); openModal(); }}>
            {isSignedIn ? signedInName : 'Sign In'}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="big-b">B</span>lanco<br />Ortega
          </h1>
          <p className="hero-sub">Where precision meets identity. Every garment tells the story of the man who wears it.</p>
          <div className="hero-buttons">
            <a href="#catalogue" className="btn btn-primary">Explore Catalogue</a>
            <a href="#booking" className="btn btn-outline">Book a Fitting</a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Bespoke</div>
            </div>
            <div>
              <div className="stat-number">1000+</div>
              <div className="stat-label">Pieces Crafted</div>
            </div>
            <div>
              <div className="stat-number">8+</div>
              <div className="stat-label">Years of Craft</div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <span>Hero Image</span>
        </div>
      </section>

      {/* Catalogue Section */}
      <section className="section" id="catalogue">
        <div className="section-header">
          <div className="section-eyebrow">Collection</div>
          <h2 className="section-title">The Catalogue</h2>
        </div>

        <div className="filter-tabs">
          {['all', 'kaftan', 'ankara', 'embroidery', 'cap', 'shacket', 'trouser', 'shirt'].map(cat => (
            <button
              key={cat}
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => filterProducts(cat)}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1) + (cat.endsWith('s') ? '' : 's')}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="section" id="services">
        <div className="section-header">
          <div className="section-eyebrow">How We Work</div>
          <h2 className="section-title">Get With Us</h2>
        </div>

        <div className="services-grid">
          <ServiceCard
            icon="📱"
            title="Live Measuring Call"
            description="Can't come in? No problem. Book a live video call with our master tailor. We guide you through every measurement from wherever you are."
            action={() => {
              scrollToElement('booking');
              setTimeout(() => selectBookingOption('live'), 500);
            }}
            buttonText="Book a Call →"
          />
          <ServiceCard
            icon="📍"
            title="In-Person Fitting"
            description="Visit our atelier for the full Blanco Ortega experience. A private session with our tailor, fabric selection, and a fitting that ensures absolute perfection."
            action={() => {
              scrollToElement('booking');
              setTimeout(() => selectBookingOption('inperson'), 500);
            }}
            buttonText="Request Fitting →"
          />
          <ServiceCard
            icon="📐"
            title="Submit Your Measurements"
            description="Already know your measurements? Fill in your size profile once and order any piece from our catalogue. Your details are saved securely to your account."
            action={() => {
              scrollToElement('measurements-section');
              setTimeout(() => setIsMeasurementsOpen(true), 500);
            }}
            buttonText="Enter Measurements →"
          />
        </div>
      </section>

      {/* Booking Section */}
      <BookingSection
        selectedType={selectedBookingType}
        onSelectType={selectBookingOption}
        onSubmit={submitBooking}
      />

      {/* Measurements Accordion */}
      <MeasurementsSection
        isOpen={isMeasurementsOpen}
        onToggle={toggleMeasurements}
        onSubmit={submitMeasurements}
      />

      {/* Footer */}
      <Footer onFilterClick={filterProducts} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cart={cart}
        onRemove={removeFromCart}
        onSubmit={submitOrder}
      />

      {/* Auth Modal */}
      {isModalOpen && (
        <AuthModal
          onClose={closeModal}
          onSignIn={handleSignIn}
          onSignOut={signOut}
          isSignedIn={isSignedIn}
          signedInName={signedInName}
        />
      )}

      {/* Toast */}
      {toast.show && <div className="toast show">{toast.message}</div>}
    </div>
  );
};

// Define component prop types
interface ProductCardProps {
  product: Product;
  onAddToCart: (name: string, category: string) => void;
}

// Product Card Component
const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className={`product-card ${product.featured ? 'featured' : ''}`} data-category={product.category}>
      <div className="product-image">
        <div className="image-placeholder">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>
        <div className="product-overlay">
          <div className="overlay-top">
            <button 
              className={`save-indicator ${isSaved ? 'saved' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsSaved(!isSaved);
              }}
            >
              {isSaved ? '♥' : '♡'}
            </button>
          </div>
          <div className="overlay-bottom">
            <div className="overlay-text">
              <div className="overlay-category">{product.category}</div>
              <div className="overlay-name">{product.name}</div>
            </div>
            <button 
              className="overlay-add"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product.name, product.category);
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  action: () => void;
  buttonText: string;
}

// Service Card Component
const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, action, buttonText }) => (
  <div className="service-card" onClick={action}>
    <span className="service-icon">{icon}</span>
    <h3 className="service-title">{title}</h3>
    <p className="service-desc">{description}</p>
    <button className="service-link" onClick={(e) => { e.stopPropagation(); action(); }}>
      {buttonText}
    </button>
  </div>
);

interface BookingSectionProps {
  selectedType: string;
  onSelectType: (type: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

// Booking Section Component
const BookingSection: React.FC<BookingSectionProps> = ({ selectedType, onSelectType, onSubmit }) => (
  <section className="section" id="booking">
    <div className="section-header">
      <div className="section-eyebrow">Schedule</div>
      <h2 className="section-title">Book a Fitting</h2>
    </div>

    <div className="booking-grid">
      <div className="booking-info">
        <h3>Choose How You'd Like to Be Measured</h3>
        <p>Whether you're across the street or across the world, we'll make sure every piece fits you exactly as it should.</p>
        <div className="booking-options">
          <div 
            className={`booking-option ${selectedType === 'live' ? 'selected' : ''}`}
            onClick={() => onSelectType('live')}
          >
            <span className="booking-dot"></span> Live Call
          </div>
          <div 
            className={`booking-option ${selectedType === 'inperson' ? 'selected' : ''}`}
            onClick={() => onSelectType('inperson')}
          >
            <span className="booking-dot"></span> In-Person
          </div>
        </div>
      </div>

      <form id="booking-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input className="form-input" type="text" id="book-name" placeholder="Your full name" required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-input" type="tel" placeholder="+234 000 000 0000" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Preferred Date</label>
            <input className="form-input" type="date" />
          </div>
          <div className="form-group">
            <label className="form-label">Time</label>
            <select className="form-select">
              <option>9:00 AM</option><option>10:00 AM</option><option>11:00 AM</option>
              <option>12:00 PM</option><option>1:00 PM</option><option>2:00 PM</option>
              <option>3:00 PM</option><option>4:00 PM</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">What are you looking to order?</label>
          <select className="form-select">
            <option>Kaftan</option><option>Ankara</option><option>Embroidery</option>
            <option>Cap</option><option>Shacket</option><option>Trouser</option>
            <option>Shirt</option><option>Full Outfit</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Additional Notes</label>
          <textarea className="form-textarea" rows={3} placeholder="Any details or special requests…"></textarea>
        </div>
        <button type="submit" className="form-submit">Confirm Request</button>
      </form>
    </div>
  </section>
);

interface MeasurementsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

// Measurements Section Component
const MeasurementsSection: React.FC<MeasurementsSectionProps> = ({ isOpen, onToggle, onSubmit }) => (
  <div className="measurements-section" id="measurements-section">
    <button className={`measure-trigger ${isOpen ? 'open' : ''}`} onClick={onToggle}>
      <div className="measure-trigger-left">
        <h2>Submit Your Measurements</h2>
        <p>Know your sizes? Fill them in once — every future order is ready to go.</p>
      </div>
      <div className="measure-chevron">▼</div>
    </button>

    <div className={`measure-dropdown ${isOpen ? 'open' : ''}`}>
      <div className="measure-dropdown-inner">
        <div className="measure-guide">
          <h3>Your dimensions, saved forever.</h3>
          <p>Fill in your measurements once and every future order is ready to go. All measurements in centimetres.</p>
          <div className="measure-illustration">
            <span>Measurement Guide</span>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Account Email</label>
            <input className="form-input" type="email" id="measure-account" placeholder="your@email.com" />
          </div>
          <div className="measure-form-grid">
            {['Neck', 'Chest', 'Waist', 'Hip', 'Shoulder', 'Sleeve', 'Shirt Length', 'Inseam', 'Thigh', 'Kaftan Length', 'Head', 'Height'].map(measure => (
              <div className="form-group" key={measure}>
                <label className="form-label">{measure}</label>
                <input className="form-input" type="number" placeholder="cm" />
              </div>
            ))}
          </div>
          <div className="form-group">
            <label className="form-label">Special Notes</label>
            <textarea className="form-textarea" rows={2} placeholder="Any fit preferences…"></textarea>
          </div>
          <button type="submit" className="form-submit">Save My Measurements</button>
        </form>
      </div>
    </div>
  </div>
);

interface FooterProps {
  onFilterClick: (category: string) => void;
}

// Footer Component
const Footer: React.FC<FooterProps> = ({ onFilterClick }) => {
  const scrollToCatalogue = (category: string) => {
    onFilterClick(category);
    const element = document.getElementById('catalogue');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand">Blanco Ortega</div>
          <div className="footer-tag">For The Elite Man</div>
          <p className="footer-desc">Bespoke tailoring crafted with precision and purpose. Every stitch is a statement.</p>
        </div>
        <div>
          <div className="footer-col-title">Navigate</div>
          <ul className="footer-links">
            <li><a href="#catalogue">Catalogue</a></li>
            <li><a href="#services">Get With Us</a></li>
            <li><a href="#booking">Book a Fitting</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Categories</div>
          <ul className="footer-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToCatalogue('kaftan'); }}>Kaftans</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToCatalogue('ankara'); }}>Ankara</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToCatalogue('embroidery'); }}>Embroideries</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToCatalogue('shirt'); }}>Shirts</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Contact</div>
          <ul className="footer-links">
            <li><a>WhatsApp</a></li>
            <li><a>Instagram</a></li>
            <li><a>hello@blancoortega.com</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Blanco Ortega. All rights reserved.</p>
        <p>Crafted with precision.</p>
      </div>
    </footer>
  );
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (index: number) => void;
  onSubmit: () => void;
}

// Cart Drawer Component
const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove, onSubmit }) => (
  <>
    <div className={`drawer-backdrop ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <div className="cart-title">Your Order</div>
        <button className="close-cart" onClick={onClose}>×</button>
      </div>
      <div className="cart-items" id="cart-items">
        {cart.length === 0 ? (
          <div className="cart-empty"><p>Your order is empty</p></div>
        ) : (
          cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <div className="cart-item-image"></div>
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cat">{item.category}</div>
                <button className="cart-item-remove" onClick={() => onRemove(index)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-footer">
          <button className="cart-checkout" onClick={onSubmit}>Submit Order Request</button>
          <button className="cart-continue" onClick={onClose}>Continue Browsing</button>
        </div>
      )}
    </div>
  </>
);

interface AuthModalProps {
  onClose: () => void;
  onSignIn: (e: React.FormEvent) => void;
  onSignOut: () => void;
  isSignedIn: boolean;
  signedInName: string;
}

// Auth Modal Component
const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSignIn, onSignOut, isSignedIn, signedInName }) => {
  const [activeTab, setActiveTab] = useState('signin');

  if (isSignedIn) {
    return (
      <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="modal">
          <button className="modal-close" onClick={onClose}>×</button>
          <h2 className="section-title" style={{ fontSize: '2rem', color: '#1e2a3a' }}>{signedInName}</h2>
          <div style={{ margin: '2rem 0' }}>
            <div style={{ padding: '1rem', background: '#f8fafc', marginBottom: '0.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>📦 My Orders</div>
            <div style={{ padding: '1rem', background: '#f8fafc', marginBottom: '0.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>📐 My Measurements</div>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>📅 My Bookings</div>
          </div>
          <button className="form-submit" style={{ background: '#64748b' }} onClick={onSignOut}>Sign Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="section-title" style={{ fontSize: '2rem' }}>Account</h2>
        <div className="modal-tabs">
          <button className={`modal-tab ${activeTab === 'signin' ? 'active' : ''}`} onClick={() => setActiveTab('signin')}>Sign In</button>
          <button className={`modal-tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Create</button>
        </div>
        
        {activeTab === 'signin' && (
          <form className="modal-form active" onSubmit={onSignIn}>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" required /></div>
            <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" required /></div>
            <button type="submit" className="form-submit">Sign In</button>
          </form>
        )}
        
        {activeTab === 'signup' && (
          <form className="modal-form active" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="form-row">
              <div className="form-group"><label className="form-label">First</label><input className="form-input" type="text" /></div>
              <div className="form-group"><label className="form-label">Last</label><input className="form-input" type="text" /></div>
            </div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" /></div>
            <div className="form-group"><label className="form-label">Phone</label><input className="form-input" type="tel" /></div>
            <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" /></div>
            <button type="submit" className="form-submit">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;