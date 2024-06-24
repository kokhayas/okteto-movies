import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

import { TitleList } from './TitleList';

const props = {
  loaded: true,
  title: 'Movies list',
  titles: [
    {
      id: 1,
      name: 'The Godfather',
      vote_average: 9.2,
    },
    {
      id: 2,
      original_title: 'The Shawshank Redemption',
      vote_average: 9.3,
    }
  ],
};

describe('TitleList', () => {
  it('should render without crashing', () => {
    const { container } = render(<TitleList {...props} />);

    expect(container.firstChild).not.toBeNull();
  });

  it('should render the title', () => {
    const { getByText } = render(<TitleList {...props} />);

    expect(getByText('Movies list')).toBeVisible();
  });

  it('should render the titles', () => {
    const { getByText, queryByTestId } = render(<TitleList {...props} />);

    expect(queryByTestId('loader')).not.toBeInTheDocument();

    expect(getByText('The Godfather')).toBeVisible();
    expect(getByText('9.2 / 10')).toBeVisible();

    expect(getByText('The Shawshank Redemption')).toBeVisible();
    expect(getByText('9.3 / 10')).toBeVisible();
  });

  it('should render the loader', () => {
    const { getByTestId } = render(<TitleList {...props} loaded={false} />);

    expect(getByTestId('loader')).toBeVisible();
  });
});
