import { useContext } from "react";
import { ItemList } from "../../Store/Item-store";
import Loading from "./Loding";

const Item_list = () => {
  const { item } = useContext(ItemList);

  return (
    <>
      {/*{item.length === 0 && <Loading />}*/}

      <div className="row">
        <div className="col-sm-12">
          <table
            id="item-master"
            className="table table-bordered table-hover w-100 dataTable dtr-inline "
            aria-describedby="item-master_info"
            style={{ width: "937px", marginTop: "20px" }}
          >
            <thead style={{ background: " #BABABA" }}>
              <tr>
                <th
                  className="sorting_disabled sorting_asc"
                  rowSpan="1"
                  colSpan="1"
                  style={{ width: "29px" }}
                  aria-label="No"
                >
                  id
                </th>
                <th
                  className="sorting"
                  tabIndex="0"
                  aria-controls="item-master"
                  rowSpan="1"
                  colSpan="1"
                  style={{ width: "133px" }}
                  aria-label="ItemName: activate to sort column ascending"
                >
                  title
                </th>
                <th
                  className="sorting"
                  tabIndex="0"
                  aria-controls="item-master"
                  rowSpan="1"
                  colSpan="1"
                  style={{ width: "88px" }}
                  aria-label="Size: activate to sort column ascending"
                >
                  price
                </th>
                <th
                  className="sorting"
                  tabIndex="0"
                  aria-controls="item-master"
                  rowSpan="1"
                  colSpan="1"
                  style={{ width: "75px" }}
                  aria-label="Brand: activate to sort column ascending"
                >
                  description
                </th>

                <th
                  className="sorting"
                  tabIndex="0"
                  aria-controls="item-master"
                  rowSpan="1"
                  colSpan="1"
                  style={{ width: "100px" }}
                  aria-label="Category: activate to sort column ascending"
                >
                  Category
                </th>
                <th
                  className="sorting"
                  tabIndex="0"
                  aria-controls="item-master"
                  rowSpan="1"
                  colSpan="1"
                  style={{ width: "43px" }}
                  aria-label="Unit: activate to sort column ascending"
                >
                  image
                </th>
              </tr>
            </thead>
            <tbody>
              {item.map((item) => (
                <tr className="odd" key={item.id}>
                  <td className="sorting_1">{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.image}</td>
                </tr>
              ))}
            </tbody>
            <tfoot style={{ background: " #BABABA" }}>
              <tr>
                <th rowSpan="1" colSpan="1">
                  id
                </th>
                <th rowSpan="1" colSpan="1">
                  title
                </th>
                <th rowSpan="1" colSpan="1">
                  price
                </th>
                <th rowSpan="1" colSpan="1">
                  description
                </th>
                <th rowSpan="1" colSpan="1">
                  Category
                </th>
                <th rowSpan="1" colSpan="1">
                  image
                </th>
              </tr>
            </tfoot>
          </table>
          {/*<div
            id="item-master_processing"
            className="dataTables_processing card"
            style={{ display: "none" }}
          >
            <div className="spinner-border text-primary m-1" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>*/}
        </div>
      </div>
    </>
  );
};
export default Item_list;
