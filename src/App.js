import React from "react";
import Table from "./components/Table";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-6xl font-bold text-pink-900  text-center mb-6">Cloudify Table</h1>
        <Table />
      </div>
    </div>
  );
};

export default App;
