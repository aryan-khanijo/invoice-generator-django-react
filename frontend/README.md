# Invoice Generator Frontend

A modern, responsive React application for generating professional PDF invoices with a clean user interface and comprehensive form handling.

## Overview

This is the frontend component of the Invoice Generator application, built with React and featuring:

- **Interactive Invoice Builder**: User-friendly forms for entering company information, client details, and invoice items
- **Real-time Calculations**: Automatic calculation of subtotals, taxes, and totals as you add items
- **PDF Generation**: Client-side PDF generation using jsPDF library
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Professional Templates**: Clean, business-appropriate invoice layouts

## Key Features

- 📄 **PDF Export**: Generate downloadable PDF invoices
- 🧮 **Auto-calculations**: Dynamic totals and tax calculations
- 💼 **Company Branding**: Customizable company information section
- 👥 **Client Management**: Easy client information entry
- 📱 **Mobile Responsive**: Works on all device sizes
- ⚡ **Real-time Updates**: Instant preview of changes
- 🎨 **Clean UI**: Modern, intuitive interface

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: Version 16.0 or higher ([Download here](https://nodejs.org/))
- **npm**: Usually comes with Node.js (alternative: yarn)
- **Git**: For version control ([Download here](https://git-scm.com/))

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/aryan-khanijo/invoice-generator-django-react.git
cd invoice-generator-django-react/frontend
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Start Development Server
```bash
# Using npm
npm start

# Or using yarn
yarn start
```

### 4. Access the Application
Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

The application will automatically reload when you make changes to the source code.

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`
- Runs the app in development mode
- Opens [http://localhost:3000](http://localhost:3000) in your browser
- The page will reload automatically when you make edits
- You will see any lint errors in the console

### `npm run build` or `yarn build`
- Builds the app for production to the `build` folder
- Correctly bundles React in production mode
- Optimizes the build for best performance
- The build is minified and the filenames include hashes
- Your app is ready to be deployed!

### `npm test` or `yarn test`
- Launches the test runner in interactive watch mode
- See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information

### `npm run eject` or `yarn eject`
**⚠️ Note: This is a one-way operation. Once you eject, you can't go back!**
- Removes the single build dependency from your project
- Copies all configuration files and transitive dependencies into your project
- Gives you full control over configuration

## Project Structure

```
frontend/
├── public/
│   ├── index.html          # HTML template
│   └── favicon.ico         # App favicon
├── src/
│   ├── App.js              # Main application component
│   ├── App.css             # Application styles
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Dependency lock file
└── README.md              # This file
```

## Component Architecture

### Main Components
- **App.js**: Root component containing the entire invoice generator interface
- **Company Information Section**: Form fields for business details
- **Invoice Details Section**: Invoice number, dates, and basic info
- **Client Information Section**: Customer/client details form
- **Items Section**: Dynamic item list with add/remove functionality
- **Totals Section**: Automated calculations display
- **PDF Generation**: Export functionality

## Dependencies

### Main Dependencies
- **React** (^18.x): Core library for building the user interface
- **jsPDF** (^2.x): Client-side PDF generation library

### Development Dependencies
- **Create React App**: Build toolchain and development server
- **Web Vitals**: Performance monitoring

## Usage Guide

### Creating an Invoice

1. **Company Information**: Fill in your business details (name, address, contact info)
2. **Invoice Details**: Add invoice number and dates
3. **Client Information**: Enter customer details
4. **Add Items**: 
   - Click "Add Item" to add invoice line items
   - Enter description, quantity, and rate
   - Amounts are calculated automatically
5. **Review Totals**: Check subtotal, tax (10%), and total amounts
6. **Add Notes**: Optional notes and payment terms
7. **Generate PDF**: Click "Generate PDF Invoice" to download

### PDF Features
- Professional layout with company branding
- Itemized billing with calculations
- Tax calculations (10% default)
- Notes and payment terms included
- Downloadable as `invoice-[number].pdf`

## Customization

### Styling
- Modify `App.css` for custom styling
- Update component-specific styles
- Responsive design built-in with CSS Grid and Flexbox

### Tax Rates
- Current tax rate is set to 10%
- Modify the `calculateTotals` function in `App.js` to change tax rates

### PDF Layout
- Customize PDF generation in the `generatePDF` function
- Modify positioning, fonts, and layout as needed

## Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Zero-config deployments with GitHub integration
- **GitHub Pages**: Free hosting for static sites
- **Firebase Hosting**: Google's hosting platform

### Environment Variables
Create a `.env` file in the root directory for environment-specific configurations:
```
REACT_APP_API_URL=your_api_url_here
REACT_APP_VERSION=1.0.0
```

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Internet Explorer 11 (limited support)

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   # Kill process using port 3000
   npx kill-port 3000
   # Or use a different port
   PORT=3001 npm start
   ```

2. **Module not found errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **PDF generation not working**
   - Check browser console for jsPDF errors
   - Ensure all required fields are filled
   - Try in an incognito/private window

## Performance Optimization

- Code splitting implemented via Create React App
- Automatic bundle optimization
- Lazy loading ready for future components
- Optimized for lighthouse scores

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -am 'Add new feature'`)
6. Push to the branch (`git push origin feature/new-feature`)
7. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Contact: [Repository Owner](https://github.com/aryan-khanijo)

---

**Built with ❤️ using React and jsPDF**
