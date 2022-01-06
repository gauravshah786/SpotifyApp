import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';
import {
    StyledFlexDiv,
    StyledHeader,
    StyledLogo,
    StyledLogoContainer,
    StyledUsername
} from './StyledComponents';

const LOGIN_URL = 'http://localhost:5000/login';
const LOGOUT_URL = 'http://localhost:5000/logout';

const StyledContainer = styled(StyledFlexDiv)`
    padding-right: 1rem;
`

const Header = ({isUserAuthenticated, setIsUserAuthenticated}) => {
    const [username, setUsername] = useState('');
    if(isUserAuthenticated){
        fetch('/user-name')
        .then(res => res.json())
        .then(data => {
            setUsername(data.username);
        }).catch(e => {
            setIsUserAuthenticated(false);
            sessionStorage.clear();
        });
    }

    return (
        <StyledHeader>
            <StyledLogoContainer>
                <StyledLogo>Spotify Fun Platform </StyledLogo>
            </StyledLogoContainer>
            <div></div>
            <StyledContainer>
                {
                    isUserAuthenticated
                    ?
                    (
                        <>
                            <StyledUsername>{username}</StyledUsername>
                            <Button href={LOGOUT_URL} label='Logout' />
                        </>
                    )
                    : <Button href={LOGIN_URL} label='Login' />
                }
            </StyledContainer>
        </StyledHeader>
    );
};

export default Header;