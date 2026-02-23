import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from '@/components/ui/Skeleton';

describe('Skeleton component', () => {
  it('renders with default text variant', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(el.className).toContain('animate-pulse');
    expect(el.className).toContain('rounded-md');
  });

  it('renders circular variant', () => {
    const { container } = render(<Skeleton variant="circular" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('rounded-full');
  });

  it('renders rectangular variant', () => {
    const { container } = render(<Skeleton variant="rectangular" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('rounded-lg');
  });

  it('applies custom width and height as numbers', () => {
    const { container } = render(<Skeleton width={100} height={50} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('100px');
    expect(el.style.height).toBe('50px');
  });

  it('applies custom width and height as strings', () => {
    const { container } = render(<Skeleton width="80%" height="2rem" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('80%');
    expect(el.style.height).toBe('2rem');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="my-custom-class" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('my-custom-class');
  });
});
