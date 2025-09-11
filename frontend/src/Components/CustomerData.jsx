import { useEffect, useState } from "react";
import "../App.css";
import Form from "./Form";

const CustomerData = () => {
  const [custdata, setCustdata] = useState([]);

  //get customer
  useEffect(() => {
    fetch("http://127.0.0.1:8000/customers/")
      .then((res) => res.json())
      .then((data) => setCustdata(data))
      .catch((err) => console.log(err));
  }, []);

  //delete record
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://127.0.0.1:8000/customers/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("deleted", data);
        alert("record deleted successfully");
        setCustdata(custdata.filter((c) => c.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Form />
      <br></br>
      <div className="">
        <div>
          <table class="table table-dark table-striped ">
            <thead>
              <tr>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Marks</th>
              </tr>
            </thead>
            <tbody>
              {custdata.map((data) => (
                <tr key={data.id}>
                  <th scope="row"></th>
                  <td className="data">{data.id}</td>
                  <td className="data">{data.First}</td>
                  <td className="data">{data.Last}</td>
                  <td className="data">{data.Marks}</td>

                  <td>
                    <button onClick={() => handleDelete(data.id)}>
                      {" "}
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default CustomerData;
