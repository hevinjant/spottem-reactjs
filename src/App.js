import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Activity from "./pages/Activity";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Login />} />;
        <Route path="/home" exact element={<Home />} />;
        <Route path="/activity" exact element={<Activity />} />;
        <Route path="/callback" exact element={<Login />} />;
      </Routes>
    </div>
  );
}

export default App;
