import React, { useEffect, useState } from 'react';

import { StyledLoadingRow } from './StyledComponents';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import usePrevious from './hooks/usePrevious';

const BASE_URL = 'https://spotify-app-demo.onrender.com';

const TableContainer = ({url, dataProp}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const defaultPageSize = 10, defaultPage = 1;
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [showData, setShowData] = useState(data);
    const [currentPage, setCurrentPage] = useState(defaultPage);
    const prevPageSize = usePrevious(pageSize);
    const columns = [
        {id: 1, label: 'Track Name'},
        {id: 2, label: 'Album Name'},
        {id: 3, label: 'Length'},
        {id: 4, label: 'Explicit'},
        {id: 5, label: 'Play Preview'}
    ];
    const columnsWidth = '30% 30% 15% 10% 15%';

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}/${url}`)
            .then(res => {
                if(!res.ok) throw Error(res.json());
                return res.json();
            }).then(response => {
                const formatted = response[dataProp].map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        album: item.album,
                        length: item.length,
                        explicit: item.explicit,
                        previewURL: item.previewURL
                    }
                });
                setData(formatted);
                setIsLoading(false);
            }).catch(error => {
                console.log(error);
            });
    }, [url, dataProp]);

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
        setShowData(formattedData);
    }, [currentPage, data, pageSize, prevPageSize]);

    return (
        <>
        {
            isLoading 
            ? <StyledLoadingRow> Loading ... </StyledLoadingRow>
            :
            <>
                <TableHeader
                    columns={columns}
                    columnsWidth={columnsWidth}>
                </TableHeader>
                <TableBody
                    data={showData}
                    columnsWidth={columnsWidth}>
                </TableBody>
                <TableFooter
                    defaultPageSize={defaultPageSize}
                    totalResults={data.length}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}>
                </TableFooter>
            </>
        }
        </>
    );
};

export default TableContainer;