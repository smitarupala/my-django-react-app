import { useState } from "react";

function Card_header({ handleAdd }) {
  //const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" rounded-t-md flex justify-between card_info bg-cyan-500 p-2 mt-2">
      <h5 className="text-white mt-1">Customer</h5>
      <button className="btn btn-primary btn-sm mt-2px" onClick={handleAdd}>
        add customer
      </button>
    </div>
  );
}
export default Card_header;
