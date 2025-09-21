import { FaTrash } from 'react-icons/fa6';

const HistoryPlayback = () => {
  return (
    <div className="border border-gray-500 flex flex-col">
      <div className="bg-gray-500 text-white">
        <div className="px-2 py-2">
          <div className="font-bold">History Playback</div>
        </div>
      </div>
      <div className=" flex-1 overflow-y-auto p-1 flex flex-col gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-amber-500  rounded-md font-bold flex items-center justify-between p-1 cursor-pointer"
          >
            <div className="bg-gray-500 px-3 py-1 text-lg text-white rounded-md">
              00:00
            </div>
            <div className="text-2xl text-white font-semibold">-</div>
            <div className="bg-gray-500 px-3 py-1 text-lg text-white rounded-md">
              01:00
            </div>
            <div className="bg-gray-500 px-3 py-1 text-lg text-white rounded-md">
              NVA: 2.42
            </div>
            <div className="bg-gray-500 px-3 py-1.5 text-lg text-white rounded-md ">
              <FaTrash size={24} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPlayback;
