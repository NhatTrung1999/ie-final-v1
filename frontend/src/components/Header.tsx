import { FaCircleUser } from 'react-icons/fa6';
const Header = () => {
  return (
    <header className="h-[70px] bg-gray-600 sticky top-0 flex items-center justify-between px-3 z-40">
      <div className="text-xl text-white font-bold">IE Video CT System</div>
      <div className="flex items-center gap-2 bg-gray-500 px-3 py-2 rounded-full text-white">
        <div className="font-semibold">Administrator</div>
        <FaCircleUser size={26} />
      </div>
    </header>
  );
};

export default Header;
