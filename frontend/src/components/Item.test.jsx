import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

import { Item } from './Item';

const props = {
  // A sample of a movie
  title: 'The Godfather',
  score: 9.2,
  backdrop: 'backdrop.jpg',
};

describe('Item', () => {
  it('should render without crashing', () => {
    const { container } = render(<Item {...props} />);

    expect(container.firstChild).not.toBeNull();
  });

  it('should render the info', () => {
    const { getByText } = render(<Item {...props} />);

    expect(getByText('The Godfather')).toBeVisible();
    expect(getByText('9.2 / 10')).toBeVisible();
  });

  it('should render the backdrop', () => {
    const { getByTestId } = render(<Item {...props} />);

    expect(getByTestId('item-container')).toHaveStyle('background-image: url(backdrop.jpg);');
  });
});
