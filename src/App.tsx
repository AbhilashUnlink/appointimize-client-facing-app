/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-multi-carousel/lib/styles.css";
// import NotFound from "./pages/NotFound";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [value, setValue] = useState("70fdcfa0-9d55-4e34-ae28-dc6d013ba5f6");
  const navigate = useNavigate();
  return (
    <main>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://example.com/your-background-image.jpg')" }}>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <label>Please Enter Your ID</label>
          <input
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter salon name"
          />
          <button
            onClick={() => navigate(`/salon/${value}`)}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </div>

    </main>
  );
}

export default App;
