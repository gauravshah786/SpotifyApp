import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Content from './Content';
import Header from './Header';
import getCookie from './getCookie';

const StyledApp = styled.div`
  text-align: center;
`;

const StyledFooter = styled.footer`
  bottom: 0;
  height: 5rem;
  left: 0;
  position: fixed;
  width: 100%;
`

const SOURCE_CODE = 'https://github.com/gauravshah786/SpotifyApp';

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  // in prod, would have user id and session token generated and saved in db
  // match against encrypted and another token available on back-end
  // implementing simple cookie for storage less demo
  const sessionAuthenticated = getCookie('authenticated'); 
  
  useEffect(() => {
    setIsUserAuthenticated(sessionAuthenticated);
  }, [sessionAuthenticated]);

    return (
        <StyledApp>
          <Header 
            isUserAuthenticated={isUserAuthenticated}
            setIsUserAuthenticated={setIsUserAuthenticated} />
          {
              isUserAuthenticated 
              ? <Content/>
              : <></>
          }
          <StyledFooter>
            <p>
              Enjoy &hearts; the music :)
              <br/><br/>
              Check the <a target='_blank' href={SOURCE_CODE} rel="noreferrer">source code</a>
            </p>
          </StyledFooter>
        </StyledApp>
    );
}

export default App;
