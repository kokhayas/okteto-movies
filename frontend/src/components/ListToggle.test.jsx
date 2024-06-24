import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom'

import { ListToggle } from './ListToggle';

describe('ListToggle', () => {
  it('should render without crashing', () => {
    const { container } = render(<ListToggle />);

    expect(container.firstChild).not.toBeNull();
  });

  it('should toggle the data-toggled attribute when clicked', () => {
    const { container } = render(<ListToggle />);

    expect(container.firstChild).toHaveAttribute('data-toggled', 'false');
  
    fireEvent.click(container.firstChild);
    expect(container.firstChild).toHaveAttribute('data-toggled', 'true');
  
    fireEvent.click(container.firstChild);
    expect(container.firstChild).toHaveAttribute('data-toggled', 'false');
  });
});
