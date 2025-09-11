import { FaTrash } from "react-icons/fa";
import { RiAddLargeLine } from "react-icons/ri";

const Item_header = () => {
  return (
    <>
      <div className="raw">
        <div className="col-md-12 mt-15 item">
          <div className="card-header flex justify-between mt-2">
            <h3 className="card-title mt-2 ">Item</h3>
            <div className="flex gap-2">
              <div className="form-check form-check-inline float-right ml-3 mt-2">
                <input
                  className="form-check-input "
                  id="item_image_display"
                  type="checkbox"
                  value="1"
                />
                <label
                  htmlFor="item_image_display"
                  className="form-check-label "
                >
                  With Image
                </label>
              </div>

              <button
                type="button"
                id="delete_selected_items"
                className="btn btn-danger btn-sm w-16 float-right form-reset me-2"
              >
                <FaTrash /> Delete
              </button>

              <button
                type="button"
                data-toggle="modal"
                data-target="#modal_add_edit_item"
                className="btn btn-primary btn-sm  float-right form-reset  "
              >
                <RiAddLargeLine /> <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Item_header;
