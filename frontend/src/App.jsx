import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ShowBalanceSection from "./components/ShowBalanceSection";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <Navbar />
      <div className="ms-5 me-5 md:ms-10 md:me-10">
        <ShowBalanceSection />
        <SearchBar />
      </div>
    </>
  );
}

export default App;
