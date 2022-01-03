import { useMemo } from 'react';

export const DOTS = '...';

/* generate a range : [start, start+1, ..., end-1, end] */
const range = (start, end) => {
 var len = end - start + 1;
 var a = new Array(len);
 for (let i=0; i<len; i++) a[i] = start + i;
 return a;
};

export const usePagination = ({
  totalResults,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = useMemo(() => {
    const totalPages = Math.ceil(totalResults / pageSize);

    // Pages count is determined as 
    // 2*siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPagesToDisplay = (2*siblingCount) + 5;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPages]
    */
    if (totalPagesToDisplay >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1),
        rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    /*
      We do not want to show dots if there is only one position left 
      before/after the left/right page count
    */
    const shouldShowLeftDots = leftSiblingIndex > 2,
          shouldShowRightDots = rightSiblingIndex + 2 < totalPages,
          firstPageIndex = 1,
          lastPageIndex = totalPages;

    // Check different combinations of left and right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + (2*siblingCount);
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, lastPageIndex];
    }

    else if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + (2*siblingCount);
      const rightRange = range(
        totalPages - rightItemCount + 1,
        totalPages
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    else if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    // else condition is handled by range at line 31
  }, [totalResults, pageSize, siblingCount, currentPage]);

  return paginationRange;
};