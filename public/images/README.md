# Public Images

This directory contains images that are served statically and referenced by URL.

## Usage

Reference images directly by URL (no import needed):
```tsx
// Reference from public/images/
<img src="/images/logo.png" alt="Logo" />
<img src="/images/charts/analysis.jpg" alt="Analysis Chart" />
```

## When to Use
- Large images
- Images referenced in CSS/external files
- Images that don't need optimization
- Static assets that don't change often

## Directory Structure Example
```
public/images/
├── logos/
│   ├── company-logo.png
│   └── partner-logos/
├── charts/
│   ├── financial-analysis.png
│   └── risk-matrix.jpg
├── flags/
│   ├── france.svg
│   ├── switzerland.svg
│   └── netherlands.svg
└── screenshots/
    └── dashboard-preview.png
```