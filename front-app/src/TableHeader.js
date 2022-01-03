import React from 'react';

import { StyledHeaderCell, StyledHeaderRow } from './StyledComponents';

const getBody = (columns) => {
    const body = columns.map((column) => {
        return (
            <StyledHeaderCell key={column.id}>
                {column.label}
            </StyledHeaderCell>
        );
    });
    return body; 
};

const TableHeader = ({columns, columnsWidth}) => {
    return (
        <StyledHeaderRow columnsWidth={columnsWidth}>
            {getBody(columns)}
        </StyledHeaderRow>
    );
};

export default TableHeader;