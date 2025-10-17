# Prescription Management System - Frontend

A modern, responsive React application for managing prescriptions with an elegant tabbed interface.

## Features

- **Tabbed Interface**: Clean tabbed layout with Prescription Form and History tabs
- **Responsive Design**: Full-width layout optimized for higher resolution screens
- **Toast Notifications**: Real-time feedback for user actions
- **Form Validation**: Comprehensive form validation using React Hook Form and Zod
- **Modern UI**: Elegant design with Tailwind CSS and smooth animations
- **Type Safety**: Full TypeScript support throughout the application

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Beautiful icons
- **Vitest** - Fast unit testing framework

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Demo Login Credentials

The application includes static user authentication with the following demo credentials:

| Role           | Email               | Password  | Name             | Department        |
|----------------|---------------------|------------|------------------|-------------------|
| Administrator  | admin@clinic.com    | admin123  | Jaydeep Chandegra | General Medicine  |
| Physician      | doctor@clinic.com   | doctor123 | Dr. Jaydeep       | Cardiology        |
| Nurse          | nurse@clinic.com    | nurse123  | Jaydeep C         | Emergency Care    |
| Pharmacist     | pharmacist@clinic.com | pharma123 | Mr. Jaydeep      | Pharmacy          |
| Demo           | demo@clinic.com     | demo123   | Demo Jaydeep      | Demo Department   |

### How to Login

1. Navigate to the login page
2. Use any of the credentials above
3. Click "Sign in" to access the dashboard
4. Invalid credentials will show an error toast notification

**Note**: These are demo credentials for testing purposes only. In a production environment, authentication would be handled through a secure API.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run tests with UI interface
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Testing

This project uses **Vitest** for unit and integration testing.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI interface
npm run test:ui
```

### Test Coverage

The project includes comprehensive test coverage for:

- **Token Management**: JWT token decoding and expiration checking
- **Prescription Service**: API calls for medicines, prescriptions, and error handling
- **Form Validation**: Input validation and error handling
- **Component Logic**: User interactions and state management

### Writing Tests

When adding new features, ensure you write corresponding tests:

1. Create test files with `.test.ts` or `.test.tsx` extension
2. Place them in `__tests__` directories next to the code being tested
3. Use descriptive test names that explain the expected behavior
4. Mock external dependencies and API calls
5. Test both success and error scenarios

### Example Test

```typescript
import { describe, it, expect, vi } from 'vitest';
import { someFunction } from '../someModule';

describe('SomeModule', () => {
  it('should handle success case', () => {
    const result = someFunction('input');
    expect(result).toBe('expected output');
  });

  it('should handle error case', () => {
    expect(() => someFunction('invalid')).toThrow('Error message');
  });
});
```

## API Integration

The application integrates with a Fastify backend API for:

- Authentication and authorization
- Prescription management
- Medicine catalog
- Patient data management

## Development Guidelines

1. **Code Style**: Follow ESLint and Prettier configurations
2. **Type Safety**: Use TypeScript for all new code
3. **Testing**: Write tests for new features and bug fixes
4. **Performance**: Optimize for fast loading and smooth interactions
5. **Accessibility**: Ensure components are accessible to all users

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.