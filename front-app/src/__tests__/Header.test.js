import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

// const strings should be extracted from components 
// so tests do not have hard coded values

it('checks Header works correctly', async () => {
  render(<Header isUserAuthenticated={true}/>);
  await screen.findByText('Gaurav Shah');
  expect(screen.getByText('Logout')).toBeInTheDocument();
});