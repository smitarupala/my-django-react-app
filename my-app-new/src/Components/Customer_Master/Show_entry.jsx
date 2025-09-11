import { useState } from "react";

function Show_entry() {
  const [selected, setSelected] = useState();

  const handleOnChange = (e) => {
    setSelected(e.target.value);
    console.log(selected);
  };
  return (
    <div className="flex w-64 ml-4 bg-slate-200 ">
      <label className="flex justify-between">
        Show
        <select
          name="basic-1_length"
          aria-controls="basic-1"
          className="custom-select custom-select-sm form-control form-control-sm bg-slate-300"
          onChange={handleOnChange}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="-1">All</option>
        </select>
        entries
      </label>
    </div>
  );
}
export default Show_entry;
