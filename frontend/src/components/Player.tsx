import ReactPlayer from 'react-player';

const Player = () => {
  return (
    <div className=" h-[550px] w-full border border-gray-500 bg-black">
      <ReactPlayer
        src={'../assets/video/S1. Marking Collar Lining-ok.MOV'}
        width={'100%'}
        height={'100%'}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

export default Player;
