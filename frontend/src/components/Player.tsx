import ReactPlayer from 'react-player';
import video from '../assets/video/C5. Earthquake.mp4';

const Player = () => {
  return (
    <div className=" h-[550px] w-full border border-gray-500">
      <ReactPlayer
        src={video}
        controls
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          aspectRatio: '16/9',
        }}
      />
    </div>
  );
};

export default Player;
