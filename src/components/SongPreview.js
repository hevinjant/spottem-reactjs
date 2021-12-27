import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import useAudio from "./useAudio";

function SongPreview({ previewUrl }) {
  const [playing, toggle] = useAudio(previewUrl);

  return (
    <div className="song-preview">
      {playing ? (
        <button className="pause-button" onClick={toggle}>
          <PauseCircleIcon />
        </button>
      ) : (
        <button className="play-button" onClick={toggle}>
          <PlayCircleIcon />
        </button>
      )}
    </div>
  );
}

export default SongPreview;
