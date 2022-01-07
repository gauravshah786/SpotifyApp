import { rest } from 'msw';

import { topTracks, yearTracks } from './mockData';

export const handlers = [
  rest.get('/user-name', (_, res, ctx) => {
    return res(
        ctx.json({ username: 'Gaurav Shah'}),
    )
  }),
  rest.get('/user-top-tracks', (_, res, ctx) => {
    return res(
      ctx.json({ topTracks })
    )
  }),
  rest.get('/top-tracks-2021', (_, res, ctx) => {
    return res(
      ctx.json({ yearTracks })
    )
  })
];