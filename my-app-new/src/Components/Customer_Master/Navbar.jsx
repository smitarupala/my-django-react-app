import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaArrowsAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { GiHamburger } from "react-icons/gi";
import { FaArrowsToDot } from "react-icons/fa6";

function Navbar({ toggleSidebar, handleFullScreen, isFullScreen }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  //const [isFullScreen, setIsFullScreen] = useState(false);

  console.log("toggle:", toggleSidebar);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="main-header navbar  navbar-white  bg-slate-200 "
      ref={dropdownRef}
    >
      {/*desktop menu*/}
      <button className="px-3" onClick={toggleSidebar}>
        <AiOutlineBars />
      </button>

      <ul className=" flex gap-4 ">
        <li className="hover : text-blue-500  hover:underline  cursor-pointer nav-item d-none d-sm-inline-block  ">
          <a
            href="https://stock.ctstock.in/admin/receive-entry"
            className="nav-link"
          >
            Add Stock
          </a>
        </li>

        <li className="nav-item d-none d-sm-inline-block active">
          <Link to="/customer_master">Customer Master</Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block ">
          <Link to="/item_master">Item Master</Link>
        </li>
      </ul>

      {/* mobile dropdown 

        <ul className="md:hidden mt-3  rounded shadow p-2 space-y-2">
          <a className="p-2 rounded " href="#">
            Add Stock
          </a>
          <a className="block p-2 rounded " href="#">
            Item
          </a>
          <a className="block p-2 rounded " href="#">
            Customer
          </a>
        </ul>*/}

      {/*{isOpen && (
        <div className="absolute top-10 left-0 bg-white text-black w-40 rounded-s-xl rounded-e-xl shadow-lg z-10">
          <h3 className="bg-stone-400 ">MENU</h3>
          <a className="block px-4 py-2 hover:bg-gray-300  " href="#">
            AddStock
          </a>

          <a className="block px-4 py-2 hover:bg-gray-300 " href="#">
            Item master
          </a>

          <a className="block px-4 py-2 hover:bg-gray-300 " href="#">
            customer master
          </a>
        </div>
      )}*/}

      <ul className="flex justify-end gap-4">
        {/* <li className="nav-item dropdown">
          <a
            className="nav-link"
            data-toggle="dropdown"
            href="#"
            aria-expanded="true"
          >
            <i className="far fa-user">
              <FaRegUser />
            </i>
          </a>
        </li>*/}

        <li className="nav-item dropdown dropstart relative ">
          <a
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex="0"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="far fa-user">
              <FaRegUser />
            </i>
          </a>

          {isOpen && (
            <div className="absolute top-10 right-full  bg-white text-black w-52 rounded-s-xl rounded-e-xl shadow-lg z-10">
              <a className="block text-black px-4 py-2 no-underline    hover:bg-gray-200">
                Action
              </a>
              <div className="border-t my-1"></div>
              <a className="block text-black px-4 py-2 no-underline  hover:bg-gray-200">
                Anotheraction
              </a>
              <div className="border-t my-1"></div>
              <a className="block text-black px-4 py-2 no-underline  hover:bg-gray-200">
                Something else here
              </a>
            </div>
          )}
        </li>
        <li className="nav-item dropdown">
          <a
            role="button"
            onClick={handleFullScreen}
            className="nav-link"
            data-toggle="dropdown"
            href="#"
            aria-expanded="false"
          >
            {isFullScreen ? <FaArrowsToDot /> : <FaArrowsAlt />}
          </a>
        </li>

        <li className="nav-item dropdown">
          <a
            className="nav-link"
            data-toggle="dropdown"
            href="#"
            aria-expanded="true"
          >
            <i className="fas fa-sign-out-alt">
              <FaSignOutAlt />
            </i>
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
