import { createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/axios";
import axios from "axios";

//미들웨어
//login
export const loginUserDB = (users) => {
  return async function (dispatch) {
    console.log(users);
    await instance
      //서버에 데이터 값 넣기
      // .post("http://54.180.86.234:8080/user/login", users)
      .post("/user/login", users)
      .then((response) => {
        const accessToken = response.data.accessToken;
        const username = response.data.username;
        const nickname = response.data.nickname;
        //서버에서 받은 토큰 저장
        localStorage.setItem("token", accessToken);
        localStorage.setItem("username", username);
        localStorage.setItem("nickname", nickname);
        // 저장된 토큰으로 login 여부 확인
        if (accessToken) {
          dispatch(loginUser(true));
        }
        window.location.reload();
      })
      .catch(function (error) {
        // 로그인 실패 시 에러메시지
        console.log(error);
        window.alert(error.response.data.errorMessage);
      });
  };
};

// 카카오로그인
// export const kakaoLogin = (code) => {
//   return function (dispatch) {
//     console.log(code, "요놈");
//     axios
//       .get(`http://54.180.86.234/oauth2/authorization/kakao?code=${code}`)
//       .then((res) => {
//         // console.log("res", res);
//         const token = res.data.user.token;
//         const username = res.data.user.userId;
//         const nickname = res.data.user.userName;

//         localStorage.setItem("token", token); //예시로 로컬에 저장
//         localStorage.setItem("username", username);
//         localStorage.setItem("nickname", nickname);
//         dispatch(loginUser(true));
//         console.log("로그인 확인");
//         window.location.replace("/"); // 토큰 받고 로그인되면 화면 전환(메인으로)
//       })
//       .catch((err) => {
//         console.log("소셜로그인 에러", err);
//         window.alert("로그인에 실패하였습니다.");
//         window.location.replace("/");
//       });
//   };
// };

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
  },

  reducers: {
    loginUser: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
