import { FaPlus, FaTrash } from 'react-icons/fa6';
import { FaSyncAlt } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { TAB_STAGE_LIST } from '../types/stagelist';
import Modal from './Modal';

const StageList = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeftStart = useRef<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement | null>) => {
    isDragging.current = true;
    startX.current = e.pageX;
    if (scrollRef.current) {
      scrollLeftStart.current = scrollRef.current.scrollLeft;
      scrollRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement | null>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  return (
    <>
      <div className="border border-gray-500 overflow-auto row-span-2 flex flex-col">
        <div>
          <div className="bg-gray-500 flex justify-between items-center px-2 py-2 text-white">
            <div className="font-bold">StageList</div>
            <div className="flex items-center gap-3">
              <div className="cursor-pointer p-1">
                <FaSyncAlt size={16} />
              </div>
              <div
                className="cursor-pointer p-1"
                onClick={() => setIsOpen(true)}
              >
                <FaPlus size={20} />
              </div>
            </div>
          </div>
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            className="bg-gray-300 overflow-x-hidden flex gap-3 items-center whitespace-nowrap px-2 py-2 cursor-grab select-none"
          >
            {TAB_STAGE_LIST.map((item, i) => (
              <div
                key={i}
                className="bg-gray-900/50 px-2 py-1 rounded-lg font-bold text-white"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className=" flex-1 overflow-y-auto flex flex-col gap-2 p-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="hover:bg-gray-300 text-gray-700 cursor-pointer px-2 py-1 rounded-md font-bold  flex items-center justify-between">
              <div className="truncate">Item {i + 1}</div>
              <div className="cursor-pointer p-2">
                <FaTrash />
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </>
  );
};

export default StageList;
