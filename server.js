require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const spotify = require('./credentials');

const clientUrl = process.env.CLIENT_URL;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'front-app/build')));

const generateRandomString = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Generate random string for state variable
const state = generateRandomString();

// Pass below params to Spotify for authentication
// client_id, redirect_uri, response_type, scope, state  
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

const TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Extract the access token from Spotify's callback response
const handleCallbackResponse = (req, res, next) => {  
  if (req.query.code && req.query.state == state) {
    const url = TOKEN_URL;

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
        // NOTE: For security, accessToken should be encrypted
        // and serve over https only
        // TODO: before deployment httponly and secure 
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
        // res.cookie('accessToken', accessToken, { httpOnly: true });
        // in prod, you would have user/session id generated and saved in db
        // implementing simple cookie for storage less demo
        res.cookie('authenticated', true);
        res.redirect(`${clientUrl}`);
      })
      .catch(e => console.log(e)); // for demo app, errors aren't handled
  } else {
    res.redirect(`${clientUrl}`);
  }
};

// fetch data for the provided url with the accessToken parameter
function getData(url, accessToken) {
  return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
  }).then(apiResponse => apiResponse.json())
    .catch(e => next(e)); // for demo, errors aren't handled;
};

USER_INFO_URL = 'https://api.spotify.com/v1/me';
// get the display name for logged in user
const getUsername = (req, res) => {
  const accessToken = req.cookies.accessToken;
  if(accessToken){
    const url = USER_INFO_URL;
    return getData(url, accessToken).then(data => {
      const username = data.display_name;
      res.json({username});
    });
  } else {
    res.status(401).json({error: 'Bad Credentials'});
  }
}

// converts milliseconds to mm:ss format
const convertMSToLength = (ms) => {
  let duration = 'Unavailable';
  if(!isNaN(ms)){
    let seconds = Math.floor((ms / 1000) % 60),
        minutes = Math.floor(ms / (1000 * 60)) % 60;
      
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
    duration = minutes + ':' + seconds;
  }
  return duration;
};

const USER_TOP_TRACKS = 
  'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term';

// get the top 50 most played tracks by user on Spotify
const getUserTopTracks = (req, res) => {
  const accessToken = req.cookies.accessToken;
  let topTracks = [];
  if(accessToken){
    const url = USER_TOP_TRACKS;
    return getData(url, accessToken)
      .then(data => {
        if(data.items){
          topTracks = data.items.map((item) => {
            return {
              id: item.id,
              name: item.name,
              album: item.album.name,
              explicit: item.explicit,
              length: convertMSToLength(item.duration_ms),
              previewURL: item.preview_url
            }
          });
        }
      })
      // for demo, errors aren't handled
      .catch((e) => console.log(e))
      .finally(() => res.json({topTracks}));
    } else {
      res.status(401).json({error: 'Bad Credentials'});
    }
};

const TOP_TRACKS_2021 = 
  'https://api.spotify.com/v1/playlists/37i9dQZF1DX18jTM2l2fJY';

// get 2021's most played tracks on Spotify
  const getYearTopTracks = (req, res) => {
  const accessToken = req.cookies.accessToken;
  let yearTracks = [];
  if(accessToken){
    const url = TOP_TRACKS_2021;
    return getData(url, accessToken)
      .then(data => {
        if(data.tracks.items){
          const items = data.tracks.items;
          yearTracks = items.map((item) => {
            return {
              id: item.track.id,
              name: item.track.name,
              album: item.track.album.name,
              explicit: item.track.explicit,
              length: convertMSToLength(item.track.duration_ms),
              previewURL: item.track.preview_url
            }
          });
        }
      })
      // for demo, errors aren't handled
      .catch((e) => console.log(e))
      .finally(() => res.json({yearTracks}));
    } else {
      res.status(401).json({error: 'Bad Credentials'});
    }
}

const handleLogout = (_, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('authenticated');
  res.redirect(`${clientUrl}`);
}

app.get('/login', authorizeSpotify);
app.get('/callback', handleCallbackResponse);
app.get('/user-name', getUsername);
app.get('/user-top-tracks', getUserTopTracks);
app.get('/top-tracks-2021', getYearTopTracks);
app.get('/logout', handleLogout);

// Anything that doesn't match the above, send back the index.html file
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname + '/front-app/build/index.html'))
})

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
