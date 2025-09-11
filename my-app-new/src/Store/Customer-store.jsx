import { createContext, useEffect, useReducer, useState } from "react";

export const CustomerList = createContext([]);

const customerReducer = (currval, action) => {
  let newv = currval;
  if (action.type === "SET_CUST") {
    newv = action.payload;
  } else if (action.type === "ADD_CUST") {
    newv = [...currval, action.payload];
  } else if (action.type === "EDIT_CUST") {
    newv = currval.map((curr) => curr.id == action.payload.id);
  } else if (action.type === "DELETE_CUST") {
    newv = currval.filter((curr) => curr.no !== action.payload.id);
  } else if (action.type === "SEARCH") {
    console.log("dddd", action.payload.searchv);
    if (action.payload.searchv.trim().toLowerCase() === "") {
      newv = action.payload.allCustomer;
    } else {
      newv = currval.filter((curr) =>
        curr.First.toLowerCase().includes(action.payload.searchv)
      );
    }
  }

  return newv;
};

const CustomerProvider = ({ children }) => {
  const [allCustomer, setAllCustomer] = useState([]);
  const [customer, dispatchCustomer] = useReducer(
    customerReducer,
    DEFAULT_CUSTOMER
  );

  //set Customer

  useEffect(() => {
    fetch("http://127.0.0.1:8000/customers/")
      .then((res) => res.json())
      .then(
        (data) => (
          setAllCustomer(data),
          dispatchCustomer({ type: "SET_CUST", payload: data })
        )
      )
      .catch((err) => console.log(err));
  }, []);

  //Add Customer
  const addCust = (id, First, Last, email, mob1, mob2) => {
    dispatchCustomer({
      type: "ADD_CUST",
      payload: {
        id: id,
        First: First,
        Last: Last,
        email: email,
        mob1: mob1,
        mob2: mob2,
      },
    });
    //setCustomer([...customer,{no:no,f_name:f_name,p_name:p_name,email:email,mob1:mob1,mob2:mob2}]);
  };

  //edit customer
  const editCustomer = (id, First, Last, email, mob1, mob2) => {
    dispatchCustomer({
      type: "EDIT_CUST",
      payload: {
        id: id,
        First: First,
        Last: Last,
        email: email,
        mob1: mob1,
        mob2: mob2,
      },
    });
  };
  //delete Customer
  const deleteCustomer = (id) => {
    dispatchCustomer({
      type: "DELETE_CUST",
      payload: { id },
    });
    /*console.log(`${no} item deleted`);
               const deleterec=customer.filter(item=>item.no !== no);
               setCustomer(deleterec);*/
  };

  //search item
  const searchCust = (e) => {
    const searchv = e.target.value;
    console.log("final va:", searchv);
    dispatchCustomer({ type: "SEARCH", payload: { searchv, allCustomer } });

    /*     if (searchv === " " || searchv.length < customer.length) {
      dispatchCustomer({
        type: "RESET",
        payload: { DEFAULT_CUSTOMER },
      });
    } else {
      dispatchCustomer({
        type: "SEARCH_CUST",
        payload: { searchv },
      });
    }*/
  };

  return (
    <CustomerList.Provider
      value={{ customer, addCust, deleteCustomer, searchCust, editCustomer }}
    >
      {children}
    </CustomerList.Provider>
  );
};
const DEFAULT_CUSTOMER = [];
/*
  {
    no: 1,
    f_name: "piyan",
    p_name: "fultariya",
    email: "piyan@gmail.com",
    mob1: "111643455",
    mob2: "22355355",
  },
  {
    no: 2,
    f_name: "rug",
    p_name: "fultariya",
    email: "rug@gmail.com",
    mob1: "565643455",
    mob2: "577775355",
  },
  {
    no: 3,
    f_name: "rugveda",
    p_name: "fultariya",
    email: "rugveda@gmail.com",
    mob1: "5656321655",
    mob2: "55355355",
  },
  {
    no: 4,
    f_name: "tirtha",
    p_name: "fultariya",
    email: "tirtha@gmail.com",
    mob1: "565643455",
    mob2: "5535665345",
  },
  {
    no: 5,
    f_name: "kriva",
    p_name: "fultariya",
    email: "kriva@gmail.com",
    mob1: "569683455",
    mob2: "5512125355",
  },
  {
    no: 6,
    f_name: "smita",
    p_name: "fultariya",
    email: "sm@gmail.com",
    mob1: "3434324",
    mob2: "54535343",
  },
];*/
export default CustomerProvider;
