import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Contents from "./pages/Contents";
import Detail from "./pages/Detail";
import Write from "./pages/Write";
import Header from "./components/Header";
import GlobalStyles from "./assets/css/GlobalStyles";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contents" element={<Contents />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/write" element={<Write />} />
        <Route path="/write/:id" element={<Write />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
