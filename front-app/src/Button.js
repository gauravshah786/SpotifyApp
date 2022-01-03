import React from 'react';

import { StyledButton } from './StyledComponents';

const Button = ({ href, label }) => {
    return (
        <StyledButton as='a' href={href}>
            {label}
        </StyledButton>
    );
};

export default Button;