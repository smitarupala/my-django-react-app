import { createContext, useEffect, useReducer, useState } from "react";
import { LuBold, LuBookKey } from "react-icons/lu";
import Loading from "../Components/Item_Master/Loding";

export const ItemList = createContext([]);

const itemReducer = (state, action) => {
  if (action.type === "fetch_success") {
    return action.payload;
  }
  return state;
};

const ItemProvider = ({ children }) => {
  const [item, dispatchItem] = useReducer(itemReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("fetch started");
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Http Error! status: ${res.status} `);
        }

        return res.json();
      })

      .then((data) => {
        dispatchItem({ type: "fetch_success", payload: data });
      })
      .catch((err) => {
        setError(err.message || "something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p>
        <Loading />
      </p>
    );
  if (error)
    return (
      <p style={{ color: "red", marginTop: "50px" }}>
        <center>
          {" "}
          <b>Error : {error}</b>{" "}
        </center>
      </p>
    );

  return <ItemList.Provider value={{ item }}>{children}</ItemList.Provider>;
};

/*const dummy = [
  {
    id: "1",
    title: "aaaa",
    description: "herrrlellek",
    price: 1200,
    category: "sdsdsds",
    image: "dwdww",
  },
];*/
export default ItemProvider;
