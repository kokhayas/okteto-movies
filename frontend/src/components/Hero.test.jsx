import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

import { Hero } from './Hero';

jest.mock('../assets/images/movie-bg.jpg', () => 'movie-bg.jpg');

describe('Hero', () => {
  it('should render without crashing', () => {
    const { container } = render(<Hero />);

    expect(container.firstChild).not.toBeNull();
  });
  
  it('should render the content', () => {
    const { getByRole, getByText } = render(<Hero />);

    expect(getByRole('heading', { name: 'Bohemian Rhapsody' })).toBeVisible();
    expect(getByText(/Queen take the music world/)).toBeVisible();
  });

  it('should render the buttons', () => {
    const { getByRole } = render(<Hero />);

    expect(getByRole('link', { name: 'Play' })).toBeVisible();
    expect(getByRole('link', { name: 'My list' })).toBeVisible();
  });

  it('should render the backdrop', () => {
    const { container } = render(<Hero />);

    expect(container.firstChild).toHaveStyle('background-image: url(movie-bg.jpg);');
  });
});
