import React from 'react';
import styled from 'styled-components';

import { usePagination, DOTS } from './usePagination';
import { StyledFlexDiv } from './StyledComponents';

const StyledListContainer = styled.ul`
  display: flex;
  list-style: none;
`

const StyledListItem = styled.li`
  color: #a6266e;
  font-weight: ${props => props.selected ? 'bold' : ''};
  margin-right: 5px;
  visibility: ${props => props.disabled ? 'hidden' : 'visible' };
  &:hover {
    background: 0 0;
    cursor: pointer;
  }
`;

const Pagination = props => {
  const {
    setCurrentPage,
    totalResults,
    siblingCount = 1,
    currentPage,
    pageSize
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalResults,
    siblingCount,
    pageSize
  });

  if (currentPage === 0) {
    return null;
  }

  if(paginationRange.lenngth < 2) {
    return (
      <StyledFlexDiv>
        <StyledListItem key={`pageNumber1`} selected> 1 </StyledListItem>
      </StyledFlexDiv>
    );
  }

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <StyledFlexDiv>
      <StyledListContainer>
        <StyledListItem disabled={currentPage === 1} onClick={onPrevious}>
          &lt;
        </StyledListItem>

        {
          paginationRange.map(pageNumber => {
            if (pageNumber === DOTS) {
              return <StyledListItem>&#8230;</StyledListItem>;
            }
            return (
              <StyledListItem 
                key={`pageNumber${pageNumber}`}
                selected={pageNumber === currentPage}
                onClick={() => setCurrentPage(pageNumber)}>
                {pageNumber}
              </StyledListItem>
            );
        })}

        <StyledListItem disabled={currentPage === lastPage} onClick={onNext}>
          &gt;
        </StyledListItem>
      </StyledListContainer>
    </StyledFlexDiv>
  );
};

export default Pagination;
