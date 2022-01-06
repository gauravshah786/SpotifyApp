import { useState, useEffect } from "react";

export default function useAudio(url) {
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