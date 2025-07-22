# Images Assets

This directory contains images that are imported into React components.

## Usage

Import images in your components:
```tsx
import logoImage from './logo.png';
import chartImage from './chart.jpg';

// Use in JSX
<img src={logoImage} alt="Logo" />
```

## Supported Formats
- PNG
- JPG/JPEG
- SVG
- WebP
- GIF

## Best Practices
- Use descriptive filenames
- Optimize images for web (compress before adding)
- Consider using SVGs for icons and simple graphics
- Use WebP format for better compression when possible