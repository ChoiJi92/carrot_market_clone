import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Contents from "./pages/Contents";
import Detail from "./pages/Detail";
import Write from "./pages/Write";
import Search from "./pages/Search";
import Header from "./components/Header";
import GlobalStyles from "./assets/css/GlobalStyles";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/modules/userSlice";
import { loadContentDB } from "./redux/modules/contentSlice";
import KakaoAuth from "./shared/KakaoAuth";

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
        {/* 뷰 확인용 */}
        <Route path="/search/" element={isloaded && <Search />} />
        <Route path="/search/:search" element={isloaded && <Search />} />
        <Route
          path="http://54.180.86.234/oauth2/authorization/kakao?redirect_uri=http://localhost:3000"
          exact
          // element={<Main />}
          // component={KakaoAuth}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
