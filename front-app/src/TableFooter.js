import React from 'react';

import Pagination  from './Pagination';
import ResultsDropDown from './ResultsDropDown';
import { StyledTableFooter } from './StyledComponents';
import TotalResults from './TotalResults';

const TableFooter = (props) => {
    return (
        <StyledTableFooter>
            <ResultsDropDown
                defaultPageSize={props.defaultPageSize}
                setPageSize={props.setPageSize}/>
            <Pagination 
                pageSize={props.pageSize}
                totalResults={props.totalResults}
                currentPage={props.currentPage}
                setCurrentPage={props.setCurrentPage}
            />
            <TotalResults totalResults={props.totalResults}/>
        </StyledTableFooter>
    );
};

export default TableFooter;
