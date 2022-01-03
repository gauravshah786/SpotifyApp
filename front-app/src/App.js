import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Content from './Content';
import Header from './Header';

const StyledApp = styled.div`
  text-align: center;
`;

const App = () => {
    const [data, setData] = useState([]);

    const urlParams = new URLSearchParams(window.location.search);
    const isUserAuthorized = urlParams.has('authorized') ? true : false;

    useEffect(() => {
        console.log('in effect');
        if(isUserAuthorized){
          fetch('/recently-played')
          .then(res => res.json())
          .then(response => {
            console.log(response);
            const formatted = response['topTracks'].map(item => {
                return {
                  id: item.id,
                  name: item.name,
                  album: item.album,
                  length: item.length,
                  previewURL: item.previewURL
                }
            });
            setData(formatted);
          });
        }
    }, [isUserAuthorized]);
    
    return (
      <StyledApp>
        <Header isUserAuthorized={isUserAuthorized}/>
        <div>
        { 
          isUserAuthorized 
            ? <Content data={data}/>
            : <></>
        }
        </div>
      </StyledApp>
    );
}

export default App;
