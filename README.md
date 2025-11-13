# Eco-Stitch - Sustainable Fashion E-commerce

A modern, responsive React application for sustainable clothing brand Eco-Stitch. Built with React, Vite, Tailwind CSS, and React Router.

## 🌱 Features

### Core Functionality
- **Product Catalog**: Browse sustainable clothing with detailed product information
- **Shopping Cart**: Add items, customize products, manage quantities
- **Workshops**: RSVP for sustainability workshops and events
- **Corporate Gifting**: Inquiry system for bulk orders
- **Admin Dashboard**: Password-protected analytics and data management
- **Newsletter**: Email subscription with localStorage persistence

### Technical Features
- **React 18** with functional components and hooks
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive, utility-first styling
- **React Router** for client-side navigation
- **React Context** for global state management
- **localStorage** for data persistence
- **Accessibility** features (ARIA labels, keyboard navigation)
- **Responsive Design** (mobile-first approach)

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone and setup**:
```bash
cd "c:\\Users\\lenovo\\OneDrive\\NSUT cllg\\Team phoenix"
npm install
```

2. **Generate placeholder assets** (optional):
```bash
npm run scaffold:assets
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open browser**: Navigate to http://localhost:3000

### Environment Variables (Optional)

Create a `.env` file in the root directory:

```env
# Optional: API endpoint for backend integration
VITE_API_URL=http://localhost:8000/api

# Optional: Analytics or monitoring keys
VITE_ANALYTICS_ID=your_analytics_id
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation and cart
│   ├── Footer.jsx      # Site footer
│   ├── CartDrawer.jsx  # Shopping cart sidebar
│   └── ProductModal.jsx # Product detail modal
├── pages/              # Route components
│   ├── Home.jsx        # Landing page
│   ├── Products.jsx    # Product catalog
│   ├── Workshops.jsx   # Workshop listings
│   ├── Gifting.jsx     # Corporate gifting
│   ├── About.jsx       # Company information
│   ├── Contact.jsx     # Contact form
│   └── Admin.jsx       # Admin dashboard
├── context/            # React Context providers
│   └── CartContext.jsx # Global cart state
├── utils/              # Helper functions
│   └── cart.js         # Cart business logic
├── data/               # Static data
│   └── products.json   # Sample product catalog
├── assets/             # Images and static files
├── App.jsx             # Main app component
├── main.jsx           # React entry point
└── index.css          # Global styles
```

## 🛒 Cart System

The cart system uses React Context and localStorage for persistence:

- **Add to Cart**: Products with customization options
- **Quantity Management**: Increase/decrease item quantities
- **Customization**: Size, color, and other product options
- **Free Shipping**: Automatic calculation above ₹1,500
- **Checkout Flow**: Customer information and order processing
- **Order Export**: Download order details as JSON

## 🎨 Styling & Design

### Color Palette
- **Primary**: `#2F7A4A` (Forest Green)
- **Accent**: `#DFAF87` (Warm Sand)
- **Muted**: `#F6F3EE` (Cream)
- **Text**: `#2D3748` (Dark Gray)

### Responsive Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### Typography
- **Headings**: Font family serif (system fonts)
- **Body**: Font family sans (system fonts)
- **Sizes**: Tailwind typography scale

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint code analysis
npm run lint:fix     # Auto-fix linting issues

# Testing
npm run test         # Run unit tests
npm run test:watch   # Watch mode testing
npm run test:coverage # Coverage report

# Assets
npm run scaffold:assets  # Generate placeholder images
```

## 🏪 Admin Dashboard

Access the admin panel at `/admin` with password: `ecostichadmin2024`

### Admin Features
- **Overview**: Statistics and recent activity
- **Orders**: View and export customer orders
- **Workshops**: Manage workshop RSVPs
- **Inquiries**: Customer contact form submissions
- **Newsletter**: Email subscriber management
- **Data Export**: JSON export for all data types

## 📱 API Integration (Optional)

The app can work with a REST API backend. If `VITE_API_URL` is set:

### Expected Endpoints
```
POST /api/orders        # Create new order
POST /api/workshops     # Workshop RSVP
POST /api/inquiries     # Contact form submissions
POST /api/newsletter    # Newsletter subscriptions
```

### Fallback Behavior
All data is automatically saved to localStorage if no API is configured.

## 🧪 Testing

Unit tests for cart functionality:

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Coverage
- Cart reducer logic
- Utility functions
- Component interactions
- Form validations

## 🚀 Deployment

### Production Build
```bash
npm run build
```

The `dist/` folder contains the production build.

### Deployment Options
1. **Vercel**: Connect GitHub repo for auto-deployment
2. **Netlify**: Drag and drop `dist/` folder
3. **GitHub Pages**: Use `gh-pages` branch
4. **Static Hosting**: Upload `dist/` to any web server

### Build Optimization
- **Code Splitting**: Automatic with Vite
- **Asset Optimization**: Images and CSS minification
- **Tree Shaking**: Remove unused code
- **Bundle Analysis**: Use `npm run build -- --analyze`

## 🔒 Security Notes

### Admin Access
- Default password should be changed in production
- Consider implementing proper authentication
- Rate limiting for login attempts

### Data Privacy
- All data stored locally in browser
- No sensitive information transmitted
- GDPR-compliant data handling

## 🌍 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **ES6 Features**: Modern JavaScript required
- **CSS Grid/Flexbox**: Full support needed

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

### Development Guidelines
- Use functional components with hooks
- Follow ESLint configuration
- Write tests for new features
- Update documentation

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**Port already in use**:
```bash
npm run dev -- --port 3001
```

**Build errors**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Missing assets**:
```bash
npm run scaffold:assets
```

**Cart not persisting**:
- Check browser localStorage support
- Clear browser cache and try again

### Getting Help
- Check browser console for errors
- Verify Node.js version (16+)
- Review network requests in dev tools
- Check localStorage in browser dev tools

## 📊 Performance

### Lighthouse Scores (Target)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 85+

### Optimization Tips
- Lazy load images
- Code splitting by route
- Minimize bundle size
- Optimize image formats
- Use service worker for caching

---

**Eco-Stitch** - Sustainable fashion for a better tomorrow 🌱

Built with ❤️ using React, Vite, and Tailwind CSS