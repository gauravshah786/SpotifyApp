import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// const strings should be extracted from components 
// so tests do not have hard coded values

it('renders App correctly', () => {
  render(<App/>);
  expect(screen.getByText('Spotify Fun Platform')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
});