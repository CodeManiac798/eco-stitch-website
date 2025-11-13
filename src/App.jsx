import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Workshops from './pages/Workshops';
import Gifting from './pages/Gifting';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import './styles/tailwind.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          {/* Navigation */}
          <Header />
          
          {/* Main Content */}
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/gifting" element={<Gifting />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Global Modals */}
          <CartDrawer />
          <ProductModal />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;