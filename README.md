# Mashallah - Muslim Dating & Matrimony Frontend

A modern React frontend application for Mashallah, a Muslim dating and matrimony platform.

## Features

- 🏠 **Homepage** with hero section and call-to-action
- ✨ **Features Overview** showcasing platform benefits
- 💬 **Testimonials** section with success stories
- 📱 **App Download** section for mobile apps
- 🔐 **Authentication** pages (Login & Register)
- 📱 **Responsive Design** - works on all devices
- 🎨 **Modern UI** built with Tailwind CSS

## Tech Stack

- **React 18** - UI library
- **React Router** - Navigation
- **Vite** - Build tool
- **Tailwind CSS** - Styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Features.jsx
│   ├── Testimonials.jsx
│   ├── AppDownload.jsx
│   └── Footer.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── App.jsx          # Main app component with routing
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Customization

You can customize the colors, fonts, and styling by editing:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles
- Individual component files for specific styling

## License

This project is created for educational purposes.

