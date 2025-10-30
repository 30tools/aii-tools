const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// PWA icon sizes
const iconSizes = [
  { size: 72, name: 'icon-72x72.png' },
  { size: 96, name: 'icon-96x96.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 144, name: 'icon-144x144.png' },
  { size: 152, name: 'icon-152x152.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'icon-512x512.png' },
];

// Splash screen sizes for different devices
const splashSizes = [
  { width: 1125, height: 2436, name: 'splash-1125x2436.png' }, // iPhone X/XS
  { width: 1242, height: 2208, name: 'splash-1242x2208.png' }, // iPhone 6+/7+/8+
  { width: 750, height: 1334, name: 'splash-750x1334.png' },   // iPhone 6/7/8
  { width: 1536, height: 2048, name: 'splash-1536x2048.png' }, // iPad
  { width: 1668, height: 2224, name: 'splash-1668x2224.png' }, // iPad Pro 10.5"
  { width: 2048, height: 2732, name: 'splash-2048x2732.png' }, // iPad Pro 12.9"
];

// Create public/icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Function to create base icon SVG
function createBaseSVG(size) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.15}"/>
      <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="${size * 0.25}" font-weight="bold" 
            text-anchor="middle" fill="white">30</text>
      <text x="50%" y="85%" font-family="Arial, sans-serif" font-size="${size * 0.12}" 
            text-anchor="middle" fill="white" opacity="0.9">tools</text>
    </svg>
  `;
}

// Function to create splash screen SVG
function createSplashSVG(width, height) {
  const iconSize = Math.min(width, height) * 0.3;
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
      <g transform="translate(${(width - iconSize) / 2}, ${(height - iconSize) / 2})">
        <rect width="${iconSize}" height="${iconSize}" fill="url(#iconGrad)" rx="${iconSize * 0.15}"/>
        <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="${iconSize * 0.25}" font-weight="bold" 
              text-anchor="middle" fill="white">30</text>
        <text x="50%" y="85%" font-family="Arial, sans-serif" font-size="${iconSize * 0.12}" 
              text-anchor="middle" fill="white" opacity="0.9">tools</text>
      </g>
      <text x="50%" y="${(height + iconSize) / 2 + 60}" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.06}" 
            text-anchor="middle" fill="white" opacity="0.8">AI Tools Collection</text>
    </svg>
  `;
}

async function generateIcons() {
  console.log('🎨 Generating PWA icons...');
  
  // Generate app icons
  for (const { size, name } of iconSizes) {
    const svg = createBaseSVG(size);
    const outputPath = path.join(iconsDir, name);
    
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Generated ${name} (${size}x${size})`);
  }

  // Generate favicon
  const faviconSvg = createBaseSVG(32);
  await sharp(Buffer.from(faviconSvg))
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'favicon.png'));
  
  console.log('✅ Generated favicon.png');

  // Generate splash screens
  console.log('📱 Generating splash screens...');
  for (const { width, height, name } of splashSizes) {
    const splashSvg = createSplashSVG(width, height);
    const outputPath = path.join(iconsDir, name);
    
    await sharp(Buffer.from(splashSvg))
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Generated ${name} (${width}x${height})`);
  }

  // Generate Apple touch icons
  const appleTouchSvg = createBaseSVG(180);
  await sharp(Buffer.from(appleTouchSvg))
    .png()
    .toFile(path.join(iconsDir, 'apple-touch-icon.png'));
  
  console.log('✅ Generated apple-touch-icon.png');

  // Generate maskable icon (for Android)
  const maskableSvg = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="256" cy="256" r="256" fill="url(#grad)"/>
      <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="128" font-weight="bold" 
            text-anchor="middle" fill="white">30</text>
      <text x="50%" y="85%" font-family="Arial, sans-serif" font-size="64" 
            text-anchor="middle" fill="white" opacity="0.9">tools</text>
    </svg>
  `;
  
  await sharp(Buffer.from(maskableSvg))
    .png()
    .toFile(path.join(iconsDir, 'maskable-icon-512x512.png'));
  
  console.log('✅ Generated maskable-icon-512x512.png');

  // Generate OG image
  const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bgGrad)"/>
      <g transform="translate(100, 150)">
        <rect width="160" height="160" fill="url(#iconGrad)" rx="24"/>
        <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="40" font-weight="bold" 
              text-anchor="middle" fill="white">30</text>
        <text x="50%" y="85%" font-family="Arial, sans-serif" font-size="20" 
              text-anchor="middle" fill="white" opacity="0.9">tools</text>
      </g>
      <text x="320" y="220" font-family="Arial, sans-serif" font-size="64" font-weight="bold" 
            fill="white">Free AI Tools Collection</text>
      <text x="320" y="280" font-family="Arial, sans-serif" font-size="32" 
            fill="white" opacity="0.8">30+ ChatGPT-powered utilities for writing, creativity and productivity</text>
      <text x="320" y="350" font-family="Arial, sans-serif" font-size="24" 
            fill="#3b82f6">No signup required - 100% free - Instant results</text>
    </svg>
  `;
  
  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'og-image.png'));
  
  console.log('✅ Generated og-image.png');

  console.log('\n🎉 All PWA images generated successfully!');
  console.log(`📁 Images saved to: ${iconsDir}`);
}

// Run the generation
generateIcons().catch(console.error);