import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Content from './Content';
import Header from './Header';
import getCookie from './getCookie';

const StyledApp = styled.div`
  text-align: center;
`;

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
        </StyledApp>
    );
}

export default App;
