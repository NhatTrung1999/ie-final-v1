import { FaCircleCheck, FaPause, FaPlay } from 'react-icons/fa6';
import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { setIsPlaying } from '../features/controlpanel/controlpanelSlice';
import { formatDuration } from '../utils/formatDuration';

const ControlPanel = () => {
  const { activeColId } = useAppSelector((state) => state.tablect);
  const { isPlaying, duration, currentTime } = useAppSelector(
    (state) => state.controlpanel
  );
  const dispatch = useDispatch();
  const handleStartStop = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleDone = () => {
    console.log('Done', activeColId);
  };

  const handleTypes = () => {
    console.log('Types');
  };

  return (
    <div className="border border-gray-500 flex flex-col overflow-y-auto">
      <div className="bg-gray-500 text-white sticky top-0 z-20">
        <div className="px-2 py-2">
          <div className="font-bold">Control Panel</div>
        </div>
      </div>
      <div className="flex-1  grid grid-rows-3 gap-2 p-1">
        <div className=" grid grid-cols-3 gap-2">
          <div
            className={`flex justify-center items-center text-xl font-semibold rounded-md bg-gray-500 text-white ${
              activeColId === null ? 'opacity-80' : ''
            }`}
          >
            {formatDuration(currentTime)}
          </div>
          {isPlaying ? (
            <button
              className={`flex justify-center items-center gap-1 bg-red-500 text-white rounded-md  ${
                activeColId === null
                  ? 'cursor-not-allowed opacity-80'
                  : 'cursor-pointer'
              }`}
              onClick={handleStartStop}
              disabled={activeColId === null ? true : false}
            >
              <div>
                <FaPause size={20} />
              </div>
              <div className="font-semibold">Stop</div>
            </button>
          ) : (
            <button
              className={`flex justify-center items-center gap-1 bg-blue-500 text-white rounded-md  ${
                activeColId === null
                  ? 'cursor-not-allowed opacity-80'
                  : 'cursor-pointer'
              }`}
              onClick={handleStartStop}
              disabled={activeColId === null ? true : false}
            >
              <div>
                <FaPlay size={20} />
              </div>
              <div className="font-semibold">Start</div>
            </button>
          )}
          <button
            className={`flex justify-center items-center gap-1 bg-green-500 text-white rounded-md ${
              activeColId === null
                ? 'cursor-not-allowed opacity-80'
                : 'cursor-pointer'
            }`}
            onClick={handleDone}
            disabled={activeColId === null ? true : false}
          >
            <div>
              <FaCircleCheck size={18} />
            </div>
            <div className="font-semibold">Done</div>
          </button>
        </div>
        <div className=" grid grid-cols-3 gap-2">
          <button
            className={`flex justify-center items-center bg-gray-500 text-white rounded-md p-1 ${
              activeColId === null
                ? 'cursor-not-allowed opacity-80'
                : 'cursor-pointer'
            }`}
            disabled={activeColId === null ? true : false}
            onClick={handleTypes}
          >
            <div className="font-semibold flex-1 h-full flex justify-center items-center">
              NVA
            </div>
            <div className="font-semibold flex-1 h-full flex justify-center items-center bg-white text-gray-500 rounded-md text-lg">
              0.0
            </div>
          </button>
          <button
            className={`flex justify-center items-center bg-gray-500 text-white rounded-md p-1 ${
              activeColId === null
                ? 'cursor-not-allowed opacity-80'
                : 'cursor-pointer'
            }`}
            disabled={activeColId === null ? true : false}
            onClick={handleTypes}
          >
            <div className="font-semibold flex-1 h-full flex justify-center items-center">
              VA
            </div>
            <div className="font-semibold flex-1 h-full flex justify-center items-center bg-white text-gray-500 rounded-md text-lg">
              0.0
            </div>
          </button>
          <button
            className={`flex justify-center items-center bg-gray-500 text-white rounded-md p-1 ${
              activeColId === null
                ? 'cursor-not-allowed opacity-80'
                : 'cursor-pointer'
            }`}
            disabled={activeColId === null ? true : false}
            onClick={handleTypes}
          >
            <div className="font-semibold flex-1 h-full flex justify-center items-center">
              SKIP
            </div>
            <div className="font-semibold flex-1 h-full flex justify-center items-center bg-white text-gray-500 rounded-md text-lg">
              0.0
            </div>
          </button>
        </div>
        <div
          className={`grid grid-cols-6 bg-gray-500 text-white font-semibold rounded-lg ${
            activeColId === null
              ? 'cursor-not-allowed opacity-70'
              : 'cursor-pointer'
          }`}
        >
          <div className=" flex justify-center items-center">
            {formatDuration(currentTime)}
          </div>
          <div className=" col-span-4 flex justify-center items-center">
            <input
              type="range"
              className="w-full accent-amber-200"
              disabled={activeColId === null ? true : false}
              value={currentTime}
              step={0.1}
              max={duration}
              onChange={handleChange}
            />
          </div>
          <div className=" flex justify-center items-center">
            {formatDuration(duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
