import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

const MockedNavbar = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<MockedNavbar />);
    
    expect(screen.getByText(/FaceWork/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Cards/i)).toBeInTheDocument();
  });

  it('displays language selector', () => {
    render(<MockedNavbar />);
    
    expect(screen.getByText(/🇬🇧 EN/i)).toBeInTheDocument();
    expect(screen.getByText(/🇫🇷 FR/i)).toBeInTheDocument();
    expect(screen.getByText(/🇮🇱 עב/i)).toBeInTheDocument();
  });

  it('shows login/register buttons when not authenticated', () => {
    render(<MockedNavbar />);
    
    const loginButtons = screen.getAllByText(/Login/i);
    const registerButtons = screen.getAllByText(/Register/i);
    
    expect(loginButtons.length).toBeGreaterThan(0);
    expect(registerButtons.length).toBeGreaterThan(0);
  });
});
