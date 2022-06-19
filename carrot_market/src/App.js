import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Contents from "./pages/Contents";
import Detail from "./pages/Detail";
import Write from "./pages/Write";
import Header from "./components/Header";
import GlobalStyles from "./assets/css/GlobalStyles";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/modules/userSlice";
import { loadContentDB } from "./redux/modules/contentSlice";

function App() {
  const dispatch = useDispatch();
  const [isloaded, setIsloaded] = useState(false);
  //useEffect로 쿠키에 토큰 있을시 로그인 체크
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(loginUser(true));
    }
  });
  useEffect(() => {
    async function load() {
      await dispatch(loadContentDB());
      setIsloaded(true);
    }
    load();
  }, []);
  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/contents" element={isloaded && <Contents />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/write" element={<Write />} />
        <Route path="/write/:id" element={isloaded && <Write />} />
        <Route path="/oauth/kakao/callback"></Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
