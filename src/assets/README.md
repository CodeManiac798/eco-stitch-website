# Assets Directory

This directory contains all static assets for the Eco-Stitch application.

## Structure

- `images/` - Product photos, banners, and other images
- `icons/` - SVG icon set for UI elements

## Placeholder Images

The scaffolding script generates placeholder SVG images for development:

- Hero banner (1200×600)
- Product images (400×400)
- Team photo (800×500)
- Workshop banner (800×400)
- Logo (200×60)

## Icon Set

SVG icons are provided for common UI elements:
- Cart, Heart, Search, User, Leaf

## Usage in Components

```jsx
import heroImage from '../assets/images/hero-banner.svg';
import cartIcon from '../assets/icons/cart.svg';

// Use in JSX
<img src={heroImage} alt="Hero banner" />
```

## Production Images

Replace placeholder images with:
- High-quality product photography
- Professional team photos  
- Brand-appropriate graphics
- Optimized file formats (WebP, AVIF)
- Proper alt text for accessibility

## Optimization

For production builds:
- Use responsive images with srcset
- Lazy loading for performance
- Image compression/optimization
- CDN hosting for faster delivery
