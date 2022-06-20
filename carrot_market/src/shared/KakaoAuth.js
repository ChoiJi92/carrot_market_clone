// 리다이렉트될 화면
// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { userActions } from "../redux/modules/userSlice";

// const KakaoAuth = (props) => {
//   const dispatch = useDispatch();

//   // 인가코드
//   let code = new URL(window.location.href).searchParams.get("code");

//   console.log(code);

//   useEffect(async () => {
//     await dispatch(userActions.kakaoLogin(code));
//   }, []);

//   return null;
// };

// export default KakaoAuth;
