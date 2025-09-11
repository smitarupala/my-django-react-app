import Excel from "./Excel";
import Card_header from "./Card_header";
import Show_entry from "./Show_entry";
import Search from "./Search";
import Customer_entry from "./Customer_entry";
import Showingof from "./Showingof";
import Next from "./Next";
import { useEffect, useRef, useState } from "react";
import Add_Customer from "./Add_Customer";
import CustomerProvider from "../../Store/Customer-store";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Customer_Pages = () => {
  const [isSideOpen, setIsSideOpen] = useState("true");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const boxRef = useRef();

  const toggleSidebar = () => {
    setIsSideOpen(!isSideOpen);
  };

  function handleFullScreen() {
    const element = boxRef.current;

    if (
      !document.requestFullscreen &&
      !document.webkitRequestFullscreen &&
      !document.msRequestFullscreen
    ) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!isFullScreen);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webKitfullscreenchange", handleFullScreenChange);
    document.addEventListener("msfullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webKitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullScreenChange
      );
    };
  }, [isFullScreen]);

  return (
    <CustomerProvider>
      <div
        className=" flex min-h-screen bg-amber-500 overflow-auto  m-2"
        ref={boxRef}
      >
        <Sidebar isOpen={isSideOpen} />

        <div
          className={`fixed ml-64 min-h-screen z-50 transition-transform duration-75 flex-1 max-w-full ${
            !isSideOpen ? "-translate-x-44" : ""
          } } `}
        >
          <Navbar
            toggleSidebar={toggleSidebar}
            handleFullScreen={handleFullScreen}
            isFullScreen={isFullScreen}
          />

          <div className="bg-slate-300">
            <Excel />
            <div className="">
              <div className="">
                <Card_header
                  handleAdd={() => {
                    setEditData(null);
                    setIsOpenEdit(true);
                  }}
                />
                <div className="bg-white">
                  <div className="">
                    <div className="">
                      <div className=" ">
                        <div className=" flex  w-full align-left justify-between ">
                          <Show_entry />
                          <Search />
                        </div>
                        <div className="row">
                          <Customer_entry
                            handleEdit={(cust) => {
                              setEditData(cust);
                              setIsOpenEdit(true);
                            }}
                          />

                          <div className="row">
                            <Showingof />
                            <Next />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Add_Customer
          isOpenEdit={isOpenEdit}
          setIsOpenEdit={setIsOpenEdit}
          editData={editData}
        />
      </div>
    </CustomerProvider>
  );
};
export default Customer_Pages;
