import { useContext, useEffect, useRef } from "react";
import { CustomerList } from "../../Store/Customer-store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add_Customer = ({ isOpenEdit, setIsOpenEdit, editData }) => {
  const { addCust, editCustomer } = useContext(CustomerList);
  const modalRef = useRef(null);

  const initialValues = editData || {
    id: "",
    First: "",
    Last: "",
    email: "",
    mob1: "",
    mob2: "",
  };

  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: Yup.object({
      id: Yup.number().required("enter the number"),
      First: Yup.string().min(2).max(20).required("enter the firm name"),
      Last: Yup.string().min(2).max(20).required("enter the product name"),
      email: Yup.string().email().required("enter email id"),
      mob1: Yup.number().required("enter mobile number"),
      mob2: Yup.number().required("enter mobile number"),
    }),
    validateOnChange: true,
    validateOnBlur: false,
    enableReinitialize: true,

    onSubmit: (values, action) => {
      console.log("ddd", values);
      if (editData) {
        fetch(`http://127.0.0.1:8000/customers/update/${values.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("network response was not ok");
            }
            return res.json();
          })

          .then((data) => {
            editCustomer(
              data.no,
              data.First,
              data.Last,
              data.email,
              data.mob1,
              data.mob2
            );

            toast.success("record Update successfully", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
            action.resetForm();
            if (typeof setIsOpenEdit === "function") {
              setIsOpenEdit(false);
            }
          }) // success ke baad hi reset

          .catch((err) => {
            console.error("Error:", err);
            toast.error("Something went wrong!", {
              position: "top-right",
              autoClose: 3000,
            });
          });
      } else {
        fetch("http://127.0.0.1:8000/customers/add/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("network response was not ok");
            }
            return res.json();
          })

          .then((data) => {
            addCust(
              data.id,
              data.First,
              data.Last,
              data.email,
              data.mob1,
              data.mob2
            );

            toast.success("record added successfully", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
            action.resetForm();
            setIsOpenEdit(false);
          }) // success ke baad hi reset

          .catch((err) => {
            console.error("Error:", err);
            toast.error("Something went wrong!", {
              position: "top-right",
              autoClose: 3000,
            });
          });
      }
    },
  });

  useEffect(() => {
    if (!isOpenEdit) return;

    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (typeof setIsOpenEdit === "function") {
          setIsOpenEdit(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenEdit, setIsOpenEdit]);

  if (!isOpenEdit) return null;

  /*const noElement = useRef();
  const f_nameElement = useRef();
  const p_nameElement = useRef();
  const emailElement = useRef();
  const mob1Element = useRef();
  const mob2Element = useRef();
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const no = noElement.current.value;
    const f_name = f_nameElement.current.value;
    const p_name = p_nameElement.current.value;
    const email = emailElement.current.value;
    const mob1 = mob1Element.current.value;
    const mob2 = mob2Element.current.value;

    noElement.current.value = "";
    f_nameElement.current.value = "";
    p_nameElement.current.value = "";
    emailElement.current.value = "";
    mob1Element.current.value = "";
    mob2Element.current.value = "";

    addCust(no, f_name, p_name, email, mob1, mob2);
    setShowForm("false");*/

  return (
    <>
      <div className="  fixed inset-0  bg-opacity-50 flex place-items-center justify-center  z-50">
        <div
          className=" bg-slate-50 rounded-lg tx-6 shadow-lg w-4/12  "
          ref={modalRef}
        >
          <form onSubmit={formik.handleSubmit}>
            {/*header*/}
            <div className="flex  justify-between  px-3 py-2 border-b bg-blue-500 ">
              <h1 className="text-lg font-semibold">
                {" "}
                {editData ? "Edit Customer" : "Add Customer"}
              </h1>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-950 font-bold text-lg"
                onClick={() => setIsOpenEdit(false)}
              >
                {" "}
                x{" "}
              </button>
            </div>
            {/*body*/}
            <div className="py-3 space-y-4 ">
              {Object.keys(initialValues).map((key) => (
                <div className=" flex flex-wrap mx-2 mt-2 pb-2" key={key}>
                  <label htmlFor="formGroupExampleInput" className="w-1/2">
                    {key}
                  </label>

                  <input
                    type="text"
                    id={key}
                    name={key}
                    //ref={noElement}
                    className="width-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[key] || ""}
                  />
                  {formik.errors[key] && (
                    <div className=" text-red-500 text-sm mt-1 w-full pl-60 ">
                      {formik.errors[key]}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/*footer*/}
            <div className="flex  justify-end gap-1  my-4 ">
              <button
                type="submit"
                className="bg-orange-300  hover:bg-orange-400 rounded-md p-2"
              >
                submit
              </button>

              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 rounded-md p-2 pr-2"
                onClick={() =>
                  typeof setIsOpenEdit === "function" && setIsOpenEdit(false)
                }
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add_Customer;

{
  /*<form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            no
          </label>
          <input
            type="text"
            id="no"
            name="no"
            //ref={f_nameElement}
            className=" cform"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.no || " "}
          />
          {formik.errors.no && formik.touched.no ? (
            <div style={{ color: "red" }}>{formik.errors.no}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            firmname
          </label>
          <input
            type="text"
            id="f_name"
            name="f_name"
            //ref={f_nameElement}
            className=" cform"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.f_name || ""}
          />
          {formik.errors.f_name && formik.touched.f_name ? (
            <div style={{ color: "red" }}>{formik.errors.f_name}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            person name
          </label>
          <input
            type="text"
            id="p_name"
            name="p_name"
            //ref={p_nameElement}
            className=" cform"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.p_name || ""}
          />
          {formik.errors.p_name && formik.touched.p_name ? (
            <div style={{ color: "red" }}>{formik.errors.p_name}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            //ref={emailElement}
            className=" cform"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email || ""}
          />
          {formik.errors.email && formik.touched.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            mob1
          </label>
          <input
            type="text"
            id="mob1"
            name="mob1"
            //ref={mob1Element}
            className=" cform"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mob1 || ""}
          />
          {formik.errors.mob1 && formik.touched.mob1 ? (
            <div style={{ color: "red" }}>{formik.errors.mob1}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            mob2
          </label>
          <input
            type="text"
            id="mob2"
            name="mob2"
            //ref={mob2Element}
            className="cform"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mob2 || ""}
          />
          {formik.errors.mob2 && formik.touched.mob2 ? (
            <div style={{ color: "red" }}>{formik.errors.mob2}</div>
          ) : null}
        </div>*/
}
