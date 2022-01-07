import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Content from './Content';
import Header from './Header';
import getCookie from './getCookie';
import { StyledFlexDiv } from './StyledComponents';

const StyledApp = styled.div`
  text-align: center;
`;

const StyledFooter = styled(StyledFlexDiv)`
  height: 5rem;
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
            Enjoy &hearts; the music :-)
            Check the <a target='_blank' href={SOURCE_CODE} rel="noreferrer">source code</a>
          </StyledFooter>
        </StyledApp>
    );
}

export default App;
