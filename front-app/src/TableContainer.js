import React, { useEffect, useState } from 'react';

import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import usePrevious from './usePrevious';


const TableContainer = ({data}) => {
    const defaultPageSize = 10, defaultPage = 1;
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [showData, setShowData] = useState(data);
    const [currentPage, setCurrentPage] = useState(defaultPage);
    const prevPageSize = usePrevious(pageSize);
    const columns = [
        {id: 1, label: 'Track Name'},
        {id: 2, label: 'Album Name'},
        {id: 3, label: 'Length'},
        {id: 4, label: 'Play Preview'}
    ];
    const columnsWidth = '30% 30% 15% 15%';

    useEffect(() => {
        let start, end;
        if(prevPageSize !== pageSize) { 
            start = 0;
            end = pageSize;
            setCurrentPage(1);
        } else {
            start = (currentPage - 1) * pageSize; 
            end = currentPage * pageSize;
        }
        const formattedData = data.slice(start, end);
        console.log(formattedData);
        setShowData(formattedData);
    }, [currentPage, data, pageSize, prevPageSize]);

    return (
        <>
            {/* <Table data={showData}></Table> */}
            <TableHeader columns={columns} columnsWidth={columnsWidth}>
            </TableHeader>
            <TableBody data={showData} columnsWidth={columnsWidth}>
            </TableBody>
            <TableFooter 
                defaultPageSize={defaultPageSize}
                totalResults={data.length}
                pageSize={pageSize}
                setPageSize={setPageSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            >
            </TableFooter>
        </>
    );
};

export default TableContainer;