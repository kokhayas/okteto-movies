import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

import { UserProfile } from './UserProfile';

const user = {
  name: 'Cindy',
  lastName: 'Lopez',
  avatar: 'avatar.jpg'
};

describe('UserProfile', () => {
  it('should render without crashing', () => {
    const { container } = render(<UserProfile user={user} />);

    expect(container.firstChild).not.toBeNull();
  });

  it('should render the user name and last name', () => {
    const { getByText } = render(<UserProfile user={user} />);

    expect(getByText('Cindy Lopez')).toBeVisible();
  });

  it('should render the user avatar', () => {
    const { getByAltText } = render(<UserProfile user={user} />);

    expect(getByAltText('profile')).toHaveAttribute('src', 'avatar.jpg');
  });
});
