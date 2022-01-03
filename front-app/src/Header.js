import React from 'react';

import Button from './Button';
import {
    StyledFlexDiv,
    StyledLogo,
    StyledLogoContainer,
    StyledHeader
} from './StyledComponents';

const LOGIN_URL = 'http://localhost:5000/login';
const LOGOUT_URL = 'http://localhost:5000/logout';

const Header = ({isUserAuthorized}) => {
    return (
        <StyledHeader>
            <StyledLogoContainer>
                <StyledLogo>Spotify Fun Platform </StyledLogo>
            </StyledLogoContainer>
            <div></div>
            <StyledFlexDiv>
            { 
              isUserAuthorized 
                ? <Button href={LOGOUT_URL} label='Logout'></Button>
                : <Button href={LOGIN_URL} label='Login'></Button>
            }
            </StyledFlexDiv>
        </StyledHeader>
    );
};

export default Header;