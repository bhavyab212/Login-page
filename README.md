# Animated Login & Sign Up Pages

A beautiful, interactive authentication system built with React, TypeScript, Tailwind CSS, and shadcn/ui components. Features animated cartoon characters with mouse-tracking eyes and interactive behaviors on both login and sign-up pages.

## Features

✨ **Interactive Animated Characters**
- 4 colorful cartoon characters (Purple, Black, Orange, Yellow)
- Real-time mouse tracking with eyes following cursor movement
- Random blinking animations
- Characters react when user types in the email field
- Special "peeking" animation when password is visible

🎨 **Modern Design**
- Clean, professional login form
- Gradient background with decorative elements
- Fully responsive layout (mobile & desktop)
- shadcn/ui components for consistent styling
- Tailwind CSS for utility-first styling

🔐 **Login Features**
- Email and password input fields
- Show/hide password toggle
- "Remember me" checkbox
- Forgot password link
- Google login button (UI only)
- Sign up link
- Form validation
- Error message display

📝 **Sign Up Features**
- Full name, email, and password fields
- Password confirmation with matching validation
- Show/hide password toggles for both password fields
- Terms of Service and Privacy Policy acceptance
- Google sign-up button (UI only)
- Login link for existing users
- Form validation with error messages
- Characters react to both password fields

## Demo Credentials

For testing purposes, use:
- **Email**: `erik@gmail.com`
- **Password**: `1234`

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v3** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

## Project Structure

```
src/
├── components/
│   └── ui/
│       ├── animated-characters-login-page.tsx   # Login page component
│       ├── animated-characters-signup-page.tsx  # Sign-up page component
│       ├── button.tsx                           # Button component
│       ├── input.tsx                            # Input component
│       ├── checkbox.tsx                         # Checkbox component
│       └── label.tsx                            # Label component
├── lib/
│   └── utils.ts                                 # Utility functions (cn helper)
├── App.tsx                                      # App entry point with routing
├── index.css                                    # Global styles & Tailwind directives
└── main.tsx                                     # React DOM entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173       # Login page
http://localhost:5173/#signup  # Sign-up page
```

## Navigation

The application uses hash-based routing:
- **Login Page**: `http://localhost:5173` or `http://localhost:5173/#`
- **Sign-Up Page**: `http://localhost:5173/#signup`

You can navigate between pages using the links at the bottom of each form:
- Click "Sign Up" on the login page to go to sign-up
- Click "Log in" on the sign-up page to return to login

## Character Behaviors

### Purple Character (Back Layer)
- Tallest character with purple color (#6C3FF5)
- Grows taller when user types
- Leans away when typing or password is hidden
- Peeks at password when visible (sneaky animation)
- Random blinking

### Black Character (Middle Layer)
- Medium height with dark color (#2D2D2D)
- Leans toward purple character when typing
- Looks at purple character when user starts typing
- Random blinking

### Orange Character (Front Left)
- Semi-circle shape with orange color (#FF9B6B)
- Only pupils visible (no white in eyes)
- Tracks mouse movement
- Looks away when password is visible

### Yellow Character (Front Right)
- Rounded rectangle with yellow color (#E8D754)
- Has a simple mouth (horizontal line)
- Only pupils visible (no white in eyes)
- Tracks mouse movement
- Looks away when password is visible

## Customization

### Changing Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --primary: 262.1 83.3% 57.8%;  /* Purple theme color */
  --background: 0 0% 100%;        /* White background */
  /* ... other colors */
}
```

### Modifying Character Animations

Edit the character behavior in `src/components/ui/animated-characters-login-page.tsx`:

- Adjust blinking intervals (currently 3-7 seconds random)
- Change eye tracking sensitivity
- Modify character positions and sizes
- Add new animations

### Styling the Form

The form uses Tailwind CSS classes. Modify classes directly in the component or update the theme in `tailwind.config.js`.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project is open source and available under the MIT License.

## Credits

- Component design inspired by modern login page patterns
- Built with [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
