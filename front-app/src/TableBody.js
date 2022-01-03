import React, { useState } from 'react';

import Player from './Player';
import { StyledBodyContainer, StyledCell, StyledDataRow } from './StyledComponents';

const getBody = (data, columnsWidth, playingId, callback) => {
    const body = data.map((row) => {
        return (
            <StyledDataRow columnsWidth={columnsWidth} key={row.id}>
                <StyledCell> 
                    {row.name}                
                </StyledCell>
                <StyledCell> 
                    {row.album} 
                </StyledCell>
                <StyledCell> 
                    {row.length} 
                </StyledCell>
                <StyledCell> 
                {
                    row.previewURL
                    ?   <Player 
                            id={row.id} 
                            playingId={playingId} 
                            setPlayingId={callback} 
                            url={row.previewURL}>
                        </Player>
                    : <span>Preview Unavailable</span>
                }
                </StyledCell>
            </StyledDataRow>
        );
    });
    return body; 
};

const TableBody = ({data, columnsWidth}) => {
    const [playingId, setPlayingId] = useState('');
    const callback = (id) => setPlayingId(id);

    return (
        <StyledBodyContainer>
            {getBody(data, columnsWidth, playingId, callback)}
        </StyledBodyContainer>
    );
};

export default TableBody;