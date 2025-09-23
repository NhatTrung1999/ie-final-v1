import { FaCircleCheck, FaPlay } from 'react-icons/fa6';

const ControlPanel = () => {
  const handleStartStop = () => {
    console.log('StartStop');
  };

  const handleDone = () => {
    console.log('Done');
  };

  const handleTypes = () => {
    console.log('Types');
  };

  return (
    <div className="border border-gray-500 flex flex-col">
      <div className="bg-gray-500 text-white">
        <div className="px-2 py-2">
          <div className="font-bold">Control Panel</div>
        </div>
      </div>
      <div className="flex-1  grid grid-rows-3 gap-2 p-1">
        <div className=" grid grid-cols-3 gap-2">
          <div className=" flex justify-center items-center text-xl font-semibold rounded-md bg-gray-500 text-white">
            00:00
          </div>
          <button
            className="flex justify-center items-center gap-1 bg-blue-500 text-white rounded-md cursor-pointer"
            onClick={handleStartStop}
          >
            <div>
              <FaPlay size={20} />
            </div>
            <div className="font-semibold">Start</div>
          </button>
          <button
            className="flex justify-center items-center gap-1 bg-green-500 text-white rounded-md cursor-pointer"
            onClick={handleDone}
          >
            <div>
              <FaCircleCheck size={18} />
            </div>
            <div className="font-semibold">Done</div>
          </button>
        </div>
        <div className=" grid grid-cols-3 gap-2">
          <button
            className="flex justify-center items-center bg-gray-500 text-white rounded-md cursor-pointer p-1"
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
            className="flex justify-center items-center bg-gray-500 text-white rounded-md cursor-pointer p-1"
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
            className="flex justify-center items-center bg-gray-500 text-white rounded-md cursor-pointer p-1"
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
        <div className=" grid grid-cols-6 bg-gray-500 text-white font-semibold rounded-lg">
          <div className=" flex justify-center items-center">00:00</div>
          <div className=" col-span-4 flex justify-center items-center">
            <input type="range" className="w-full accent-amber-200" />
          </div>
          <div className=" flex justify-center items-center">00:00</div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
