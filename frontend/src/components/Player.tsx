import ReactPlayer from 'react-player';
const Player = () => {
  return (
    <div className=" h-[550px] w-full border">
      <ReactPlayer
        src="https://www.youtube.com/live/VKBu4Ip-ors?si=csY3AoB1JBF78JGl"
        width={'100%'}
        height={'100%'}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

export default Player;
