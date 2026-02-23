import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

describe('Card component', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default md padding', () => {
    const { container } = render(<Card>Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('p-6');
  });

  it('applies custom padding', () => {
    const { container } = render(<Card padding="lg">Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('p-8');
  });

  it('applies no padding when padding is none', () => {
    const { container } = render(<Card padding="none">Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).not.toContain('p-4');
    expect(el.className).not.toContain('p-6');
    expect(el.className).not.toContain('p-8');
  });

  it('applies hover classes when hover prop is true', () => {
    const { container } = render(<Card hover>Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('hover:shadow-lg');
  });

  it('does not apply hover classes by default', () => {
    const { container } = render(<Card>Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).not.toContain('hover:shadow-lg');
  });

  it('applies glow effect when glow prop is true', () => {
    const { container } = render(<Card glow>Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('hover:shadow-');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="my-class">Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('my-class');
  });
});

describe('CardHeader component', () => {
  it('renders children', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});

describe('CardTitle component', () => {
  it('renders as h3', () => {
    render(<CardTitle>Title</CardTitle>);
    const heading = screen.getByText('Title');
    expect(heading.tagName).toBe('H3');
  });

  it('applies font-display class', () => {
    render(<CardTitle>Title</CardTitle>);
    const heading = screen.getByText('Title');
    expect(heading.className).toContain('font-display');
  });
});

describe('CardDescription component', () => {
  it('renders as paragraph', () => {
    render(<CardDescription>Description</CardDescription>);
    const desc = screen.getByText('Description');
    expect(desc.tagName).toBe('P');
  });
});
