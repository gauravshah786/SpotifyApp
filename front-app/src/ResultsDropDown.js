import React, { useState } from 'react';
import styled from 'styled-components';

import { StyledFlexDiv } from './StyledComponents';

const StyledSpan = styled.span`
    margin-right: 10px;
`;

const ResultsDropDown = ({defaultPageSize, setPageSize}) => {
    const [selectedOption, setSelectedOption] = useState(defaultPageSize);
    const handleChange = (val) => {
        setPageSize(parseInt(val,10));
        setSelectedOption(val);
    };

    return (
        <StyledFlexDiv>
            <StyledSpan>Results per page: </StyledSpan>
            <select value={selectedOption} 
                    name='pageSize'
                    id='pageSize'
                    onChange={e => handleChange(e.target.value)}>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='50'>50</option>
            </select>
        </StyledFlexDiv>
    );
};

export default ResultsDropDown;