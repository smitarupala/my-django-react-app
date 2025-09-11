import { useContext } from "react";
import { CustomerList } from "../../Store/Customer-store";

const Search = () => {
  const { searchCust } = useContext(CustomerList);

  const handleOnChange = (event) => {
    //console.log(event.target.value);
    searchCust(event);
  };

  return (
    <div className="col-sm-12 col-md-6 ">
      <div id="basic-1_filter" className="dataTables_filter search_value">
        <label>
          Search:
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder=""
            aria-controls="basic-1"
            onChange={(event) => handleOnChange(event)}
          />
        </label>
      </div>
    </div>
  );
};
export default Search;
