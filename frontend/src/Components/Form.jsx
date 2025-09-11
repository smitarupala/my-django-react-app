import { useState } from "react";

const Form = () => {
  const [formdata, setFormdata] = useState({
    First: "",
    Last: "",
    Marks: "",
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formdata,
      Marks: parseInt(formdata.Marks, 10),
    };

    fetch("http://127.0.0.1:8000/customers/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data added:", data);
        alert("data added successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="form1" onSubmit={handleSubmit}>
      <div className="mb-3 ">
        <label for="exampleInputEmail1" className="form-label">
          First
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          name="First"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Last
        </label>
        <input
          type="text"
          className="form-control "
          id="exampleInputPassword1"
          name="Last"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Marks
        </label>
        <input
          type="text"
          className="form-control  "
          id="marks"
          name="Marks"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default Form;
