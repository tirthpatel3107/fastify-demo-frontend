import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock navigate function
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render title', () => {
    renderWithRouter(<Header title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render subtitle when provided', () => {
    renderWithRouter(<Header title="Test Title" subtitle="Test Subtitle" />);

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('should not render subtitle when not provided', () => {
    renderWithRouter(<Header title="Test Title" />);

    expect(screen.queryByText('Test Subtitle')).not.toBeInTheDocument();
  });

  it('should render profile button', () => {
    renderWithRouter(<Header title="Test Title" />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should load user data from localStorage', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'Admin',
      department: 'IT',
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));

    renderWithRouter(<Header title="Test Title" />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith('user');
  });

  it('should display user name when available', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'Admin',
      department: 'IT',
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));

    renderWithRouter(<Header title="Test Title" />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('should open dropdown when profile button is clicked', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'Admin',
      department: 'IT',
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));

    renderWithRouter(<Header title="Test Title" />);

    const profileButton = screen.getByRole('button');
    fireEvent.click(profileButton);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should close dropdown when clicking outside', async () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'Admin',
      department: 'IT',
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));

    renderWithRouter(<Header title="Test Title" />);

    const profileButton = screen.getByRole('button');
    fireEvent.click(profileButton);

    expect(screen.getByText('Sign out')).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    });
  });

  it('should call logout on sign out', async () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'Admin',
      department: 'IT',
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));

    renderWithRouter(<Header title="Test Title" />);

    const profileButton = screen.getByRole('button');
    fireEvent.click(profileButton);

    const signOutButton = screen.getByText('Sign out');
    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(localStorageMock.clear).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  it('should handle invalid JSON in localStorage', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json');
    
    renderWithRouter(<Header title="Test Title" />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith('user');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
  });

  it('should show loading state when no user data', () => {
    localStorageMock.getItem.mockReturnValue(null);

    renderWithRouter(<Header title="Test Title" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

