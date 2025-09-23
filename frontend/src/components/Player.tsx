import ReactPlayer from 'react-player';
import video from '../assets/video/S12. Xin Chào.MOV';

const Player = () => {
  return (
    <div className=" h-[550px] w-full border border-gray-500 bg-black">
      <ReactPlayer
        src={video}
        controls
        style={{
          objectFit: 'contain',
          width: '100%',
          height: '100%',
          // aspectRatio: '16/9',
        }}
      />
    </div>
  );
};

export default Player;
