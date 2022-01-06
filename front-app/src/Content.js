import React from 'react';

import Tabs from './Tabs';
import TableContainer from './TableContainer';

const Content = () => {
    return (
        <div>
            <Tabs defaultTab='My Top Tracks'>
                <div label='My Top Tracks'>
                    <TableContainer
                        dataProp={'topTracks'}
                        url={'user-top-tracks'}>
                    </TableContainer>
                </div>
                <div label='Top Tracks Of 2021'>
                    <TableContainer
                        dataProp={'yearTracks'}
                        url={'top-tracks-2021'}>
                    </TableContainer>
                </div>
            </Tabs>
        </div>
    );
};

export default Content;