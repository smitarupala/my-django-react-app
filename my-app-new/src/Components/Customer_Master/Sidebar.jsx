import { useState } from "react";

const Sidebar = ({ isOpen }) => {
  const [isHover, setIsHover] = useState(false);

  /*const sidebarWidth = () => {
    return isOpen ? "w-64" : isHover ? "w-64" : "w-20";
  };*/

  return (
    <>
      /*sidebar*/
      <aside
        className={` fixed left-0 top-0 h-screen  bg-gray-900 transition-all duration-300 border  text-white ease-in-out
       ${
         isOpen ? "w-64" : isHover ? "w-64" : "w-20"
       } transition-transform  z-50`}
        onMouseEnter={() => {
          if (!isOpen) setIsHover(true);
          console.log("enter");
        }}
        onMouseLeave={() => {
          if (isHover) setIsHover(false);
          console.log("leave");
        }}
      >
        <div className="p-2 text-lg font-bold border-b  border-gray-600">
          Sidebar Menu
        </div>
        <ul className="p-4 space-y-4">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </aside>
    </>
  );
};
export default Sidebar;
