require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const spotify = require('./credentials');

const clientUrl = process.env.CLIENT_URL;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const generateRandomString = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const state = generateRandomString();

const authorizeSpotify = (req,res) => {
  const scopes = 'user-read-recently-played user-top-read';
  const url = `https://accounts.spotify.com/authorize?&client_id=${
    spotify.client_id
  }&redirect_uri=${encodeURI(
    spotify.redirect_uri
  )}&response_type=code&scope=${scopes}&state=${state}`;
  
  res.redirect(url);
};

const authorizationHeaderStr = `Basic ${Buffer.from(
  `${spotify.client_id}:${spotify.client_secret}`
).toString('base64')}`;

const handleCallbackResponse = (req, res, next) => {  
  if (req.query.code && req.query.state == state) {
    const url = 'https://accounts.spotify.com/api/token';

    const data = {
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: spotify.redirect_uri
    };

    const headers = {
      'Authorization': authorizationHeaderStr,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const searchParams = new URLSearchParams();

    Object.keys(data).forEach(prop => {
      searchParams.set(prop, data[prop]);
    });

    fetch(url, {
      method: 'POST',
      headers,
      body: searchParams,
    })
      .then(res => res.json())
      .then(credentials => {
        // token_type, expires_in, refresh_token, scope, access_token credentials
        const accessToken = credentials.access_token;
        // const refreshToken = credentials.refresh_token;
        // NOTE: For security, accessToken can be encrypted
        res.cookie('accessToken',accessToken, { httpOnly: true });
        res.redirect(`${clientUrl}/?authorized=true`);
      })
      .catch(next);
  } else {
    res.redirect(`${clientUrl}/login`);
  }
};

const convertMSToLength = (ms) => {
  let duration = 'Unavailable';
  if(!isNaN(ms)){
    const totalSeconds = Math.floor(ms/1000);
    const min = Math.floor(totalSeconds/60);
    const seconds = totalSeconds%60;
    duration = `${min}m ${seconds}s`;
  }
  return duration;
};

const getRecentlyPlayed = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if(accessToken){
    const url = 'https://api.spotify.com/v1/me/top/tracks?limit=100&time_range=long_term';

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }).then(apiResponse => apiResponse.json())
      .then(data => {
        let topTracks = [];
        if(data.items){
          topTracks = data.items.map((item) => {
            return {
              id: item.id,
              name: item.name,
              album: item.album.name,
              length: convertMSToLength(item.duration_ms),
              previewURL: item.preview_url
            }
          });
        }
        return res.json({topTracks});
      })
      .catch(error => console.log(error));
    } else {
      res.redirect(`${clientUrl}/login`);;
    }
};

const handleLogout = (req, res, next) => {
  res.cookie('accessToken','', { httpOnly: true });
  res.redirect(`${clientUrl}`);
}

app.get('/login', authorizeSpotify);
app.get('/callback', handleCallbackResponse);
app.get('/recently-played', getRecentlyPlayed);
app.get('/logout', handleLogout);

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
