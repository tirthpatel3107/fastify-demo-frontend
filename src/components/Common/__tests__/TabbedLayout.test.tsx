import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TabbedLayout from '../TabbedLayout';

describe('TabbedLayout', () => {
  const mockTabs = [
    {
      id: 'tab1',
      label: 'Tab 1',
      icon: <span>Icon1</span>,
      content: <div>Tab 1 Content</div>,
    },
    {
      id: 'tab2',
      label: 'Tab 2',
      icon: <span>Icon2</span>,
      content: <div>Tab 2 Content</div>,
    },
    {
      id: 'tab3',
      label: 'Tab 3',
      icon: <span>Icon3</span>,
      content: <div>Tab 3 Content</div>,
    },
  ];

  it('should render tabs with labels', () => {
    render(<TabbedLayout tabs={mockTabs} />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('should render default tab content on mount', () => {
    render(<TabbedLayout tabs={mockTabs} />);

    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 2 Content')).not.toHaveClass('opacity-100');
    expect(screen.queryByText('Tab 3 Content')).not.toHaveClass('opacity-100');
  });

  it('should render specified default tab', () => {
    render(<TabbedLayout tabs={mockTabs} defaultTab="tab2" />);

    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 1 Content')).not.toHaveClass('opacity-100');
  });

  it('should switch tabs when clicked', () => {
    render(<TabbedLayout tabs={mockTabs} />);

    // Initially Tab 1 should be visible
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();

    // Click on Tab 2
    const tab2 = screen.getByText('Tab 2');
    fireEvent.click(tab2);

    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
    const tab1Content = screen.queryByText('Tab 1 Content');
    expect(tab1Content).not.toHaveClass('opacity-100');
  });

  it('should apply active styles to active tab', () => {
    render(<TabbedLayout tabs={mockTabs} />);

    const tab1 = screen.getByText('Tab 1').closest('button');
    const tab2 = screen.getByText('Tab 2').closest('button');

    expect(tab1).toHaveClass('border-indigo-500', 'text-indigo-600');
    expect(tab2).not.toHaveClass('border-indigo-500', 'text-indigo-600');

    fireEvent.click(screen.getByText('Tab 2'));

    expect(tab2).toHaveClass('border-indigo-500', 'text-indigo-600');
    expect(tab1).not.toHaveClass('border-indigo-500', 'text-indigo-600');
  });

  it('should handle empty tabs array', () => {
    render(<TabbedLayout tabs={[]} />);

    // Should render empty layout
    expect(screen.getByTestId('tabbed-layout-empty')).toBeInTheDocument();
  });

  it('should render multiple tabs sequentially', () => {
    render(<TabbedLayout tabs={mockTabs} />);

    // Click through all tabs
    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Tab 3'));
    expect(screen.getByText('Tab 3 Content')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Tab 1'));
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
  });
});

