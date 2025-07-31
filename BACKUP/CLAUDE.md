# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based trade desk application for Neskao, specifically analyzing global locations for trade operations. The application evaluates multiple cities (Paris, Geneva, Amsterdam, Singapore, Hamburg, London, Maurice, Andorra, and Cyprus) across various criteria including regulation compliance, social impact, ROI, DFI financing, and cash management.

## Architecture

### Core Application Structure
- **Main Component**: `neskao-trade-desk-fixed.tsx` - Single-file React application with multiple sections
- **Integration Module**: `integration-chypre.js` - Contains data structure and integration instructions for Cyprus location
- **UI Framework**: Uses Tailwind CSS for styling and Recharts for data visualization
- **Component Structure**: Tab-based navigation with sections for Dashboard, Context, Regulation, Product Mix, Financing, SG&A, Profitability, Social Impact, Decision Analysis, and Risks

### Key Data Structures
The application works with standardized data objects for each location containing:
- Identity information (name, flag, ranking, status, decision, zone, taxation, timezone)
- Evaluation scores (regulatory, social impact, ROI, DFI financing, cash management, weighted score)
- Financial data (volumes, revenue, margins, costs, EBITDA, cash flow over 3 years)
- Profitability metrics (3-year ROI, IRR, payback period)
- Financing structure (capital requirements, debt ratios, DFI ratings)
- SG&A breakdown (personnel, offices, IT systems, compliance, travel, setup costs)
- Regulatory requirements (minimum capital, licenses, fiscal conventions, restrictions)
- Social impact details (proximity to Ivory Coast, ESG ecosystem, impact financing, transparency)

## Development Workflow

### Code Style
- Uses functional React components with hooks
- Consistent 2-space indentation throughout
- Component methods use arrow functions with implicit returns where possible
- Data is organized in clear, structured objects at the top of components
- Responsive design using Tailwind's grid system

### Adding New Locations
When integrating new locations (like Cyprus), follow the pattern established in `integration-chypre.js`:
1. Create complete data object with all required sections
2. Update Dashboard villesData array
3. Add to Decision Analysis villesCompletes
4. Include in all relevant data arrays (financing, SG&A, profitability, impact, regulation)
5. Update counters and totals throughout the application
6. Verify appearance in all comparative charts and graphs

### Component Organization
The main application uses a section-based approach:
- Navigation through sections array with tab switching
- Each section renders via dedicated render functions (renderDashboard, renderAnalyseDecisionnelle, etc.)
- Consistent Card component usage for UI sections
- Charts use ResponsiveContainer for proper scaling

### Data Visualization
- Bar charts for comparative analysis
- Line charts for evolution over time
- Pie charts for distribution breakdowns
- Radar charts for multi-dimensional comparisons
- Consistent color coding by status (GO=green, POSSIBLE=orange/yellow, NO=red)

## Important Patterns

### Status and Decision Logic
- Each location has both a `statut` (GO/POSSIBLE/NO) and `decision` field
- Color coding follows: GO (#10b981 green), POSSIBLE (#f59e0b orange), NO (#ef4444 red)
- Rankings are maintained consistently across all sections

### Financial Calculations
- All monetary values in millions of euros (M€) or thousands of euros (000 EUR)
- 3-year projection standard across all locations
- Volume calculations in tonnes
- ROI calculations include 3-year total return percentages

### Integration Verification
When making changes, ensure:
- All totals and averages are recalculated
- Charts include new data points
- Color consistency maintained
- Rankings properly updated
- Counter text updated (e.g., "11 locations" to "12 locations")