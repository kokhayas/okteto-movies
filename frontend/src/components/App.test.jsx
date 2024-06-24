import React from 'react';

import { act, render, within } from '@testing-library/react';
import '@testing-library/jest-dom'

import App from './App';

const originalFetch = global.fetch;
const mockFetch = jest.fn((endpoint) => Promise.resolve({
  json: () => Promise.resolve(endpoint === '/api/movies' ? [
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
  ] : [
    {
      id: 3,
      name: 'The Dark Knight',
      vote_average: 9.1,
    },
    {
      id: 4,
      original_title: 'The Lord of the Rings',
      vote_average: 9.4,
    }
  ]),
}));

describe('App', () => {
  beforeAll(() => {
    global.fetch = mockFetch
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should render without crashing', async () => {
    const { container } = await act(() => render(<App />));

    expect(container.firstChild).not.toBeNull();
  });

  it('should render the header', async () => {
    const { container, getByRole, getByText } = await act(() => render(<App />));

    expect(container.querySelector('.logo')).toBeVisible();

    const menu = getByRole('list')

    expect(within(menu).getByText('Home')).toBeVisible();
    expect(within(menu).getByText('Movies')).toBeVisible();
    expect(within(menu).getByText('My List')).toBeVisible();

    expect(getByText('Cindy Lopez')).toBeVisible();
  });

  it('should fetch the user data', async () => {
    await act(() => render(<App />));

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenNthCalledWith(1, '/api/movies');
    expect(global.fetch).toHaveBeenNthCalledWith(2, '/api/watching');
  });

  it('should render the movies and watching list', async () => {
    const { findByText } = await act(() => render(<App />));

    expect(await findByText('The Godfather')).toBeVisible();
    expect(await findByText('9.2 / 10')).toBeVisible();

    expect(await findByText('The Shawshank Redemption')).toBeVisible();
    expect(await findByText('9.3 / 10')).toBeVisible();

    expect(await findByText('The Dark Knight')).toBeVisible();
    expect(await findByText('9.1 / 10')).toBeVisible();

    expect(await findByText('The Lord of the Rings')).toBeVisible();
    expect(await findByText('9.4 / 10')).toBeVisible();
  });
});
