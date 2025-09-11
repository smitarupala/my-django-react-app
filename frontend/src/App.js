import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import CustomerData from "./Components/CustomerData";



function App() {
  const [msg, setMsg] = useState(null);






  useEffect(() => {
    fetch("http://127.0.0.1:8000/data/")
      /*{
        credentials: "include"// session auth के लिए जरूरी
      })*/
      .then(res => res.json())

      .then(data => setMsg(data))

      .catch(err => console.log(err))
  }, [])

  return (
    <div> <h1>login status</h1>
      {msg && (
        <div>
          <p>{msg.message}</p>
          <p>{msg.status}</p>
          <p>{msg.marks}</p>
        </div>)
      }
      <CustomerData />

    </div>
  );
}

export default App;
