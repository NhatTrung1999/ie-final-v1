import { IoClose } from 'react-icons/io5';
import { AREA, STAGE } from '../types/constant';

const Modal = () => {
  return (
    <div className="fixed bg-transparent inset-0 flex justify-center items-center z-50">
      <div className="w-full max-w-sm bg-white flex rounded-md shadow-lg flex-col p-2">
        <div className="border-b border-gray-200 p-3 flex items-center justify-between text-gray-600">
          <h1 className="text-2xl font-bold">Upload Video</h1>
          <div className="p-1 cursor-pointer">
            <IoClose size={24} />
          </div>
        </div>
        <div className="space-y-4 p-2">
          <div>
            <label
              htmlFor="date"
              className="block mb-1 text-base font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-base font-medium text-gray-700"
            >
              Season
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              className="w-full px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
              placeholder="Enter your season..."
            />
          </div>
          <div>
            <label
              htmlFor="stage"
              className="block mb-1 text-base font-medium text-gray-700"
            >
              Stage
            </label>
            <select
              id="stage"
              name="stage"
              className="w-full px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
            >
              {STAGE.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="area"
              className="block mb-1 text-base font-medium text-gray-700"
            >
              Area
            </label>
            <select
              id="area"
              name="area"
              className="w-full px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
            >
              {AREA.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="article"
              className="block mb-1 text-base font-medium text-gray-700"
            >
              Article
            </label>
            <input
              type="article"
              id="article"
              name="article"
              className="w-full px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
              placeholder="Enter your article..."
            />
          </div>
          <div>
            <label
              htmlFor="file"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Video
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="w-full px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-full px-2 py-2 cursor-pointer font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-400"
            >
              Upload
            </button>
            <button
              type="button"
              className="w-full px-2 py-2 cursor-pointer font-medium text-white bg-red-600 rounded-lg hover:bg-red-500 focus:ring-2 focus:ring-blue-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
