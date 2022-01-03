import React, { useState } from 'react';

import Player from './Player';

const Table = ({data}) => {
    const [playingId, setPlayingId] = useState('');
    const callback = (id) => setPlayingId(id);

    return (
        <table>
            <thead>
                <tr>
                    <th>Track Name</th>
                    <th>Album Name</th>
                    <th>Length</th>
                    <th>Play Preview</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((val) => {
                        return (
                            <tr key={val.id}>
                                <td>{val.name}</td>
                                <td>{val.album}</td>
                                <td>{val.length}</td>
                                <td>
                                    {
                                        val.previewURL
                                        ?   <Player 
                                                id={val.id} 
                                                playingId={playingId} 
                                                setPlayingId={callback} 
                                                url={val.previewURL}>
                                            </Player>
                                        : <span>Preview Unavailable</span>
                                    }
                                </td>
                            </tr>
                        )}
                    )
                }
            </tbody>
        </table>
    );
}

export default Table;