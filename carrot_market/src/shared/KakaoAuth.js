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

// 인가코드
//  let code = new URL(window.location.href).searchParams.get("code");
// let state = new URL(window.location.href).searchParams.get("state");

// 토큰 get
// const accessToken = new URL(window.location.href).searchParams.get(
//   "Authorization"
// );
// console.log(accessToken);
// localStorage.setItem("token", accessToken);

// //id get
// const username = new URL(window.location.href).searchParams.get("username");
// console.log(username);
// localStorage.setItem("username", username);

// //닉네임 get
// const nickname = new URL(window.location.href).searchParams.get("nickname");
// console.log(nickname);
// localStorage.setItem("nickname", nickname);

// //profile 이미지 get
// const profileImage = new URL(window.location.href).searchParams.get("profile");
// console.log(profileImage);
// localStorage.setItem("profileImage", profileImage);
