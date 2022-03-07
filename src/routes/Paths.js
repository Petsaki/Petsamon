import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import NotFound from "../pages/NotFound";
import Pokemon from "../pages/Pokemon";

const Paths = () => {
  return (
    <div>
      {/* Note: Στην version 6 της React Router δεν χρειάζετε να βάζουμε το exact, ξέρει από μόνο του ποιο Route να διαλέξει! */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/pokemon/:pokemon" element={<Pokemon/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Paths;
