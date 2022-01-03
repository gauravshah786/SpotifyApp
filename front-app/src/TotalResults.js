import React from 'react';

import { StyledFlexDiv } from './StyledComponents';

const TotalResults = ({totalResults}) => {
    return (
        <StyledFlexDiv>
            <span> Total Number of Results: {totalResults} </span>
        </StyledFlexDiv>
    );
};

export default TotalResults;