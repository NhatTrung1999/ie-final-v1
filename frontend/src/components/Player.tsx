import ReactPlayer from 'react-player';
// import video from '../assets/C1. Mantra.mp4';

const Player = () => {
  return (
    <div className=" h-[550px] w-full border border-gray-500 bg-black">
      <ReactPlayer
        src={'https://youtu.be/YudHcBIxlYw?si=GEWAZqokMJoTS8l-'}
        controls
        style={{
          objectFit: 'contain',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default Player;
