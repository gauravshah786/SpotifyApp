import React from 'react';

import { DOTS, usePagination } from './hooks/usePagination';
import { 
  StyledFlexDiv,
  StyledListContainer,
  StyledListItem
} from './StyledComponents';

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
