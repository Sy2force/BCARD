import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { AuthProvider } from '../context/AuthContext';

const MockedLoginPage = () => (
  <BrowserRouter>
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  </BrowserRouter>
);

describe('LoginPage', () => {
  it('renders login form', () => {
    render(<MockedLoginPage />);
    
    expect(screen.getByPlaceholderText(/user@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors on empty form submission', async () => {
    render(<MockedLoginPage />);
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    const emailInput = screen.getByPlaceholderText(/user@example.com/i) as HTMLInputElement;
    expect(emailInput.validity.valueMissing).toBe(true);
  });

  it('updates input values when typing', () => {
    render(<MockedLoginPage />);
    
    const emailInput = screen.getByPlaceholderText(/user@example.com/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/••••••••/i) as HTMLInputElement;
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test@1234' } });
    
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('Test@1234');
  });

  it('displays demo credentials', () => {
    render(<MockedLoginPage />);
    
    expect(screen.getByText(/Demo Credentials:/i)).toBeInTheDocument();
    expect(screen.getByText(/user@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/User@1234/)).toBeInTheDocument();
  });

  it('has link to register page', () => {
    render(<MockedLoginPage />);
    
    const registerLink = screen.getByRole('link', { name: /sign up/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
