import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/Input';

describe('Input component', () => {
  it('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('generates id from label', () => {
    render(<Input label="First Name" />);
    const input = screen.getByLabelText('First Name');
    expect(input.id).toBe('first-name');
  });

  it('uses custom id', () => {
    render(<Input label="Email" id="custom-id" />);
    const input = screen.getByLabelText('Email');
    expect(input.id).toBe('custom-id');
  });

  it('shows error message', () => {
    render(<Input label="Email" error="Email is required" />);
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('shows helper text when no error', () => {
    render(<Input label="Email" helper="We will not share your email" />);
    expect(screen.getByText('We will not share your email')).toBeInTheDocument();
  });

  it('hides helper text when error is present', () => {
    render(<Input label="Email" error="Required" helper="We will not share your email" />);
    expect(screen.queryByText('We will not share your email')).not.toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('applies error border styles', () => {
    const { container } = render(<Input label="Email" error="Required" />);
    const input = container.querySelector('input');
    expect(input!.className).toContain('border-error');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input label="Email" />);

    const input = screen.getByLabelText('Email');
    await user.type(input, 'test@example.com');
    expect(input).toHaveValue('test@example.com');
  });

  it('forwards ref correctly', () => {
    const { container } = render(<Input label="Test" />);
    const input = container.querySelector('input');
    expect(input).toBeTruthy();
    expect(input!.tagName).toBe('INPUT');
  });
});
