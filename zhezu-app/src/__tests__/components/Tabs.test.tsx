import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from '@/components/ui/Tabs';

const tabs = [
  { id: 'tab-1', label: 'Tab One', content: <div>Content One</div> },
  { id: 'tab-2', label: 'Tab Two', content: <div>Content Two</div> },
  { id: 'tab-3', label: 'Tab Three', content: <div>Content Three</div> },
];

describe('Tabs component', () => {
  it('renders all tab labels', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText('Tab One')).toBeInTheDocument();
    expect(screen.getByText('Tab Two')).toBeInTheDocument();
    expect(screen.getByText('Tab Three')).toBeInTheDocument();
  });

  it('shows first tab content by default', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText('Content One')).toBeInTheDocument();
  });

  it('switches tab on click', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);

    await user.click(screen.getByText('Tab Two'));
    expect(screen.getByText('Content Two')).toBeInTheDocument();
  });

  it('respects defaultTab', () => {
    render(<Tabs tabs={tabs} defaultTab="tab-2" />);
    expect(screen.getByText('Content Two')).toBeInTheDocument();
  });

  it('has correct ARIA tablist role', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('has correct ARIA tab roles', () => {
    render(<Tabs tabs={tabs} />);
    const tabElements = screen.getAllByRole('tab');
    expect(tabElements).toHaveLength(3);
    expect(tabElements[0].getAttribute('aria-selected')).toBe('true');
    expect(tabElements[1].getAttribute('aria-selected')).toBe('false');
  });

  it('has correct ARIA tabpanel roles', () => {
    render(<Tabs tabs={tabs} />);
    const panels = screen.getAllByRole('tabpanel');
    expect(panels.length).toBeGreaterThanOrEqual(1);
  });
});
