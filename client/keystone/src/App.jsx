import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Edit from "./components/Edit";
import Read from "./components/Read";
import Create from "./components/Create";
import Login from "./Login";
import Adminpanel from "./admincomponenets/Adminpanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/Adminpanel" element={<Adminpanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
