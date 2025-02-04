import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import Communities from "../src/pages/Communities";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (

    <Router className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/communities" element={<Communities />} />
      </Routes>
    </Router>
  );
}

export default App;