#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const assetsDir = 'src/assets';
const dirs = ['images', 'icons'];

console.log('🏗️  Scaffolding asset directories...');

// Create asset directories
dirs.forEach(dir => {
  const dirPath = join(assetsDir, dir);
  try {
    mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created: ${dirPath}`);
  } catch (error) {
    console.log(`ℹ️  Directory already exists: ${dirPath}`);
  }
});

// Create placeholder images as SVG files
const placeholders = [
  { name: 'hero-banner.svg', width: 1200, height: 600, text: 'Hero Banner' },
  { name: 'product-1.svg', width: 400, height: 400, text: 'Product Image' },
  { name: 'product-2.svg', width: 400, height: 400, text: 'Product Image' },
  { name: 'product-3.svg', width: 400, height: 400, text: 'Product Image' },
  { name: 'about-team.svg', width: 800, height: 500, text: 'Our Team' },
  { name: 'workshop-banner.svg', width: 800, height: 400, text: 'Workshop' },
  { name: 'logo.svg', width: 200, height: 60, text: 'Eco-Stitch' },
];

console.log('🖼️  Creating placeholder images...');

placeholders.forEach(({ name, width, height, text }) => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#F3F4F6"/>
  <rect x="10" y="10" width="${width - 20}" height="${height - 20}" fill="none" stroke="#D1D5DB" stroke-width="2" stroke-dasharray="5,5"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#6B7280" text-anchor="middle" dy="8">${text}</text>
  <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="14" fill="#9CA3AF" text-anchor="middle" dy="8">${width} × ${height}</text>
</svg>`;

  const filePath = join(assetsDir, 'images', name);
  writeFileSync(filePath, svg);
  console.log(`✅ Created: ${filePath}`);
});

// Create a simple icon set
const icons = [
  { name: 'cart.svg', path: 'M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 5H2m5 8v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0V9a1 1 0 011-1h8a1 1 0 011 1v4.92' },
  { name: 'heart.svg', path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
  { name: 'search.svg', path: 'M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 1 5.25 5.25a7.5 7.5 0 0 1 11.4 11.4z' },
  { name: 'user.svg', path: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { name: 'leaf.svg', path: 'M11.013 2.344c1.375-.652 2.999.174 3.627 1.845l3.188 8.486c.628 1.671-.176 3.532-1.795 4.158s-3.532-.176-4.158-1.795L8.687 6.552c-.628-1.671.176-3.532 1.795-4.158l.531-.05z' }
];

console.log('🎨 Creating icon set...');

icons.forEach(({ name, path }) => {
  const svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="${path}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  const filePath = join(assetsDir, 'icons', name);
  writeFileSync(filePath, svg);
  console.log(`✅ Created: ${filePath}`);
});

// Create a README for the assets
const assetsReadme = `# Assets Directory

This directory contains all static assets for the Eco-Stitch application.

## Structure

- \`images/\` - Product photos, banners, and other images
- \`icons/\` - SVG icon set for UI elements

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

\`\`\`jsx
import heroImage from '../assets/images/hero-banner.svg';
import cartIcon from '../assets/icons/cart.svg';

// Use in JSX
<img src={heroImage} alt="Hero banner" />
\`\`\`

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
`;

writeFileSync(join(assetsDir, 'README.md'), assetsReadme);
console.log(`✅ Created: ${join(assetsDir, 'README.md')}`);

console.log('\\n🎉 Asset scaffolding complete!');
console.log('\\n📝 Next steps:');
console.log('   1. Replace placeholder images with real assets');
console.log('   2. Update image imports in components');
console.log('   3. Add proper alt text for accessibility');
console.log('   4. Optimize images for production');