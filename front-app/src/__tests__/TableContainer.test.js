import React from 'react';
import {
    render,
    screen,
    waitForElementToBeRemoved
} from '@testing-library/react';
import '@testing-library/jest-dom';
import TableContainer from '../TableContainer';
import { topTracks } from '../mocks/mockData';

// const strings should be extracted from components 
// so tests do not have hard coded values
it('checks TableContainer works correctly', async () => {
  render(<TableContainer dataProp={'topTracks'} url='/user-top-tracks'/>);   
  expect(screen.getByText('Loading ...')).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText('Loading ...'));
  for(let i=0; i<topTracks.length; i++){
    expect(screen.getByText(topTracks[i].name)).toBeInTheDocument();
  };
  const playButtonList = screen.getAllByRole('button');
  expect(playButtonList.length).toBe(topTracks.length);
});