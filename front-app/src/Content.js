import React from 'react';

import TableContainer from './TableContainer';
import Tabs from './Tabs';

const Content = ({data}) => {
    return (
        <div>
            <Tabs defaultTab='My Top Tracks'>
                <div label='My Top Tracks'>
                    <TableContainer data={data}></TableContainer>
                </div>
                <div label='Work In Progress'>
                    Project halted due to inflation ;-)
                </div>
            </Tabs>
        </div>
    );
};

export default Content;

