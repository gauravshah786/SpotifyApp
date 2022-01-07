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

const BASE_URL = 'https://spotify-app-demo.herokuapp.com';
const LOGIN_URL = `${BASE_URL}/login`;
const LOGOUT_URL = `${BASE_URL}/logout`;

const StyledContainer = styled(StyledFlexDiv)`
    padding-right: 1rem;
`

const Header = ({isUserAuthenticated, setIsUserAuthenticated}) => {
    const [username, setUsername] = useState('');
    if(isUserAuthenticated){
        fetch(`${BASE_URL}/user-name`)
        .then(res => res.json())
        .then(data => {
            setUsername(data.username);
        }).catch(e => {
            setIsUserAuthenticated(false);
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