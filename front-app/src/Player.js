import React from "react";
import styled from 'styled-components';

import useAudio from "./hooks/useAudio";

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