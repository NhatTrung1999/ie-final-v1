import { FaCircleUser } from 'react-icons/fa6';
import { TbLogout } from 'react-icons/tb';
const Header = () => {
  return (
    <header className="h-[70px] bg-gray-600 sticky top-0 flex items-center justify-between px-3 z-10">
      <div className="text-xl text-white font-bold">IE Video CT System</div>
      <div className="flex items-center gap-2 bg-gray-500 px-3 py-2 rounded-full text-white relative cursor-pointer">
        <div className="font-semibold">Administrator</div>
        <FaCircleUser size={26} />
        {false && (
          <div className="absolute top-12 bg-white left-0 right-0 p-2 text-black rounded-md">
            <div className="flex items-center justify-between font-medium hover:bg-gray-300 px-2 py-1 cursor-pointer">
              <span className="text-base">Logout</span> <TbLogout size={20} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
