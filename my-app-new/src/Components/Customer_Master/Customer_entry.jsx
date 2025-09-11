import { useContext, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { CustomerList } from "../../Store/Customer-store";
import { toast, ToastContainer } from "react-toastify";
import Add_Customer from "./Add_Customer";

const Customer_entry = ({ handleEdit }) => {
  const { customer, deleteCustomer } = useContext(CustomerList);
  //const [editData, setEditData] = useState();
  //const [isOpenEdit, setIsOpenEdit] = useState(false);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmDelete) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/customers/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("record deleted successfully!");
        toast.success("record deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        console.log("not done");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="col-sm-12">
        <table
          id="basic-1"
          className="table table-bordered table-hover dataTable"
          aria-describedby="basic-1_info"
        >
          <thead style={{ background: " #BABABA" }}>
            <tr>
              <th
                className="sorting"
                tabIndex="0"
                aria-controls="basic-1"
                rowSpan="1"
                colSpan="1"
                aria-label="No: activate to sort column ascending"
              >
                No
              </th>
              <th
                className="sorting sorting_asc"
                tabIndex="0"
                aria-controls="basic-1"
                rowSpan="1"
                colSpan="1"
                aria-sort="ascending"
                aria-label="Firm Name: activate to sort column descending"
              >
                Firm Name
              </th>
              <th
                className="sorting"
                tabIndex="0"
                aria-controls="basic-1"
                rowSpan="1"
                colSpan="1"
                aria-label="Person name: activate to sort column ascending"
              >
                Last name
              </th>
              <th
                className="sorting"
                tabIndex="0"
                aria-controls="basic-1"
                rowSpan="1"
                colSpan="1"
                aria-label="Email: activate to sort column ascending"
              >
                Email
              </th>
              <th
                className="sorting"
                tabIndex="0"
                aria-controls="basic-1"
                rowSpan="1"
                colSpan="1"
                aria-label="Mobile No. 1: activate to sort column ascending"
              >
                Mobile No. 1
              </th>
              <th
                className="sorting"
                tabIndex="0"
                aria-controls="basic-1"
                rowSpan="1"
                colSpan="1"
                aria-label="Mobile No. 2: activate to sort column ascending"
              >
                Mobile No. 2
              </th>
              <th
                className="sorting_disabled"
                rowSpan="1"
                colSpan="1"
                aria-label="Action"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {customer.map((cust) => (
              <tr className="odd " key={cust.id}>
                <td>{cust.id}</td>
                <td>{cust.First}</td>
                <td>{cust.Last}</td>
                <td>{cust.email}</td>
                <td>{cust.mob1}</td>
                <td>{cust.mob2}</td>
                <td>
                  <a
                    className="btn btn-info btn-xs edit_button"
                    title="Edit"
                    id="edit_button"
                    //href="#"
                    data-id="1"
                    onClick={() => handleEdit(cust)}
                  >
                    <FaPencilAlt />
                    &nbsp;
                  </a>

                  <a
                    className="btn btn-danger btn-xs delete-single ml-1"
                    title="Delete"
                    //href="#"
                    data-id="66"
                    onClick={() => handleDelete(cust.id)}
                  >
                    <FaTrash />
                    &nbsp;
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot style={{ background: "#BABABA" }}>
            <tr>
              <th rowSpan="1" colSpan="1">
                No
              </th>
              <th rowSpan="1" colSpan="1">
                Firm Name
              </th>
              <th rowSpan="1" colSpan="1">
                Person name
              </th>
              <th rowSpan="1" colSpan="1">
                Email
              </th>
              <th rowSpan="1" colSpan="1">
                Mobile No. 1
              </th>
              <th rowSpan="1" colSpan="1">
                Mobile No. 2
              </th>
              <th rowSpan="1" colSpan="1">
                Action
              </th>
            </tr>
          </tfoot>
        </table>

        <div
          id="basic-1_processing"
          className="dataTables_processing card"
          style={{ display: "none" }}
        >
          <div className="spinner-border text-primary m-1" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Customer_entry;
