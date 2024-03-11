import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

function App() {
  const url = "/api/cache";
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchCache = async () => {
      const res = await axios.get(url);
      return setData(res.data);
    };
  
 
    fetchCache();
  }, []);


  return (
    <div>
      <Navbar page="cache"></Navbar>
      <Table data={data}></Table>
    
    </div>
  );
}

export default App;
