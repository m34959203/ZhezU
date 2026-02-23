import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '@/components/ui/Accordion';

const items = [
  { id: 'item-1', trigger: 'Section 1', content: 'Content for section 1' },
  { id: 'item-2', trigger: 'Section 2', content: 'Content for section 2' },
  { id: 'item-3', trigger: 'Section 3', content: 'Content for section 3' },
];

describe('Accordion component', () => {
  it('renders all items', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  it('all items are collapsed by default', () => {
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('opens item on click', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const trigger = screen.getByText('Section 1').closest('button')!;
    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('closes open item when another is clicked (single mode)', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} type="single" />);

    const trigger1 = screen.getByText('Section 1').closest('button')!;
    const trigger2 = screen.getByText('Section 2').closest('button')!;

    await user.click(trigger1);
    expect(trigger1.getAttribute('aria-expanded')).toBe('true');

    await user.click(trigger2);
    expect(trigger1.getAttribute('aria-expanded')).toBe('false');
    expect(trigger2.getAttribute('aria-expanded')).toBe('true');
  });

  it('allows multiple items open in multiple mode', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} type="multiple" />);

    const trigger1 = screen.getByText('Section 1').closest('button')!;
    const trigger2 = screen.getByText('Section 2').closest('button')!;

    await user.click(trigger1);
    await user.click(trigger2);
    expect(trigger1.getAttribute('aria-expanded')).toBe('true');
    expect(trigger2.getAttribute('aria-expanded')).toBe('true');
  });

  it('respects defaultOpen', () => {
    render(<Accordion items={items} defaultOpen={['item-2']} />);
    const trigger2 = screen.getByText('Section 2').closest('button')!;
    expect(trigger2.getAttribute('aria-expanded')).toBe('true');
  });

  it('has correct ARIA attributes', () => {
    render(<Accordion items={items} />);
    const trigger = screen.getByText('Section 1').closest('button')!;
    expect(trigger.getAttribute('aria-controls')).toBe('accordion-panel-item-1');

    const panel = document.getElementById('accordion-panel-item-1');
    expect(panel).toBeTruthy();
    expect(panel!.getAttribute('role')).toBe('region');
  });
});
