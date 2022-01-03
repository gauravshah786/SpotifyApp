import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const toggle = (id, setPlayingId) =>  {
      const playingId = playing ? '' : id;
      setPlaying(!playing);
      setPlayingId(playingId);
    }
    
    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },[audio, playing]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    return [playing, toggle];
};

const StyledButton = styled.button`
    background-color: transparent;
    border: 2px solid #41d6c3;
    border-radius: 5px;
    cursor: pointer;
    padding: 0.325rem 1.075rem;
`;

const Player = ({ id, playingId, setPlayingId, url }) => {
  const [playing, toggle] = useAudio(url);
  const setDisabled = () =>  {
    const disabled = playingId ? (playingId !== id ? true : false) : false;
    return disabled;
  }
  const handleClick = () => {
    toggle(id, setPlayingId);
  }
  return (
    <div>
      <StyledButton disabled={setDisabled()} onClick={handleClick}>
        { playing ? "Pause" : "Play" }
      </StyledButton>
    </div>
  );
};

export default Player;