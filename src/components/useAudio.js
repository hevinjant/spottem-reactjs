import { useMemo, useEffect, useState } from "react";

function useAudio(url) {
  const audio = useMemo(() => new Audio(url), []);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    //   if (playing) {
    //       if (audio.paused && !playing) {
    //           audio.play()
    //       }
    //   }
    //   else {
    //       if (!audio.paused && playing) {
    //           audio.pause()
    //       }
    //   }
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
}

export default useAudio;
