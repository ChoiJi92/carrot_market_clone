import React from "react";
import styled from "styled-components";
import "../assets/css/modal.css";

import instance from "../shared/axios";
import { useDispatch } from "react-redux";
import { loginUserDB } from "../redux/modules/userSlice";

import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router-dom";

import useGeolocation from "react-hook-geolocation";

//Signup Modal
const ModalSignup = (props) => {
  const username_ref = React.useRef(null);
  const password_ref = React.useRef(null);
  const passwordCheck_ref = React.useRef(null);
  const nickname_ref = React.useRef(null);

  //버튼 비활성화
  const [username, setUsername] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [pwCheck, setPwCheck] = React.useState("");
  const [address, setAddress] = React.useState("");
  const checkUsername = (e) => {
    setUsername(e.target.value);
  };
  const checkNickname = (e) => {
    setNickname(e.target.value);
  };
  const checkPw = (e) => {
    setPw(e.target.value);
  };
  const checkPwCheck = (e) => {
    setPwCheck(e.target.value);
  };

  // Geo location
  const { kakao } = window;
  const location = useGeolocation();
  let lat = location.latitude;
  let lng = location.longitude;
  const getAddress = (lat, lng) => {
    let geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(lat, lng);
    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const address1 = result[0].address.region_1depth_name;
        const address2 = result[0].address.region_2depth_name;
        const address3 = result[0].address.region_3depth_name;
        setAddress(`${address1} ${address2} ${address3}`);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  //벨리데이션
  const emailCheck = (email) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    //이메일 형식으로!
    return _reg.test(email);
  };
  const passwordCheck = (password) => {
    let _reg =
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[0-9a-zA-Z@$!%*#?&]{3,10}$/;
    //비밀번호는 3 ~ 10자 영문, 숫자 및 특수문자조합으로
    return _reg.test(password);
  };
  const nicknameCheck = (nickname) => {
    let _reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{3,10}$/;
    //닉네임은 3~8자 한글,영어,숫자
    return _reg.test(nickname);
  };

  // 모달 열기, 닫기를 부모로부터 받아옴
  const { open, close } = props;

  //회원가입 데이터 서버에 보내기!
  const SignupAxios = async () => {
    // 서버에 보내줄 데이터들
    let users = {
      username: username_ref.current.value,
      nickname: nickname_ref.current.value,
      password: password_ref.current.value,
      address: address,
    };
    if (
      username_ref.current.value === "" ||
      password_ref.current.value === "" ||
      nickname_ref.current.value === ""
    ) {
      window.alert("빈칸을 전부 채워주세요!");
      return;
    }
    if (!emailCheck(username_ref.current.value)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    if (!passwordCheck(password_ref.current.value)) {
      window.alert(
        "비밀번호는 8 ~ 10자 영문, 숫자 및 특수문자조합으로 작성하세요!"
      );
      return;
    }
    if (!nicknameCheck(nickname_ref.current.value)) {
      window.alert("닉네임은 3 ~ 8자 한글,영문,숫자!");
      return;
    }
    if (password_ref.current.value !== passwordCheck_ref.current.value) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    await instance
      //서버에 users 인풋 값 보내주기
      // .post("http://54.180.86.234:8080/user/signup", users)
      .post("/user/signup", users)
      //성공시 리스폰스 받아옴
      .then((response) => {
        console.log(response);
        window.alert("회원가입 성공");
        close();
      })
      //실패시 에러메시지 받아옴, 작성한 벨리데이션 문구도 같이
      .catch(function (error) {
        console.log(error);
        //회원가입 실패 시 에러메시지 alert
        window.alert(error.response.data.errorMessage);
      });
  };

  return (
    // 모달창이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <button
              style={{ fontSize: "40px" }}
              className="close"
              onClick={() => {
                close();
                setAddress("");
              }}
            >
              &times;
            </button>
          </header>
          <main>
            {" "}
            <SignupWrap>
              <SignupHeader>
                <SignupTitle>SIGN UP</SignupTitle>
              </SignupHeader>
              <Input>
                <label htmlFor="email">ID</label>
                <input
                  id="email"
                  type="email"
                  ref={username_ref}
                  //버튼비활성화
                  onChange={checkUsername}
                  required
                ></input>
                <MiniTitle>이메일로 아이디를 작성해주세요!</MiniTitle>
              </Input>
              <Input>
                <label htmlFor="nickName">NickName</label>
                <input
                  id="nickName"
                  type="name"
                  ref={nickname_ref}
                  //버튼비활성화
                  onChange={checkNickname}
                  required
                ></input>
                <MiniTitle>3 ~ 8자 한글,영문,숫자로 작성</MiniTitle>
              </Input>
              <Input>
                <label htmlFor="password">PW</label>
                <input
                  id="password"
                  type="password"
                  ref={password_ref}
                  //버튼비활성화
                  onChange={checkPw}
                  required
                ></input>
                <MiniTitle>3 ~ 10자 영문, 숫자 및 특수문자조합</MiniTitle>
              </Input>
              <Input>
                <label htmlFor="confirmPassword">PW CHECK</label>
                <input
                  id="confirmPassword"
                  type="password"
                  ref={passwordCheck_ref}
                  //버튼비활성화
                  onChange={checkPwCheck}
                  required
                ></input>
              </Input>
              <Input>
                <label htmlFor="address">Address</label>
                <input id="address" value={address} readOnly></input>
                <button
                  onClick={() => {
                    getAddress(lat, lng);
                  }}
                >
                  동네 인증
                </button>
              </Input>
              <Btn
                onClick={() => {
                  SignupAxios();
                }}
                disabled={!username || !nickname || !pw || !pwCheck || !address}
              >
                회원가입
              </Btn>
            </SignupWrap>
          </main>
        </section>
      ) : null}
    </div>
  );
};

//Login Modal
const ModalLogin = (props) => {
  // 컴포넌트 렌더링 시 로그인 여부 체크
  const username_ref = React.useRef(null);
  const password_ref = React.useRef(null);
  const dispatch = useDispatch();

  //카카오
  // const REST_API_KEY = "7ee0afaf69ecc3a879b6cccf83ea5ddd";
  // const REDIRECT_URI = "http://54.180.86.234/oauth2/authorization/kakao";
  // const REDIRECT_URI =
  //   "http://54.180.86.234/oauth2/authorization/kakao?redirect_uri=http://localhost:3000";
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const kakaoLogin = () => {
    window.location.replace(
      "http://54.180.86.234/oauth2/authorization/kakao?redirect_uri=http://localhost:3000",
      "_blank"
    );
    window.location.replace("/");
  };

  //버튼 비활성화
  const [username, setUsername] = React.useState("");
  const [pw, setPw] = React.useState("");
  const checkUsername = (e) => {
    setUsername(e.target.value);
  };
  const checkPw = (e) => {
    setPw(e.target.value);
  };

  //이메일 체크 함수
  const emailCheck = (email) => {
    let _reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return _reg.test(email);
  };

  const loginCheck = () => {
    //벨리데이션
    if (
      username_ref.current.value === "" ||
      password_ref.current.value === ""
    ) {
      window.alert("아이디와 비밀번호를 입력하세요!");
      return;
    }
    if (!emailCheck(username_ref.current.value)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    } else {
    }
    let users = {
      username: username_ref.current.value,
      password: password_ref.current.value,
    };
    //dispatch 할 때 users 데이터와 close 함수 전달 (함수전달 가능, 함수 전달 할 땐 괄호 없어야함.)
    dispatch(loginUserDB(users));
  };
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;

  return (
    // 모달창이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <button
              style={{ fontSize: "40px" }}
              className="close"
              onClick={close}
            >
              &times;
            </button>
          </header>
          <main>
            {" "}
            <SignupWrap>
              <SignupHeader>
                <SignupTitle>LOG IN</SignupTitle>
              </SignupHeader>
              <Input>
                <label htmlFor="email">ID</label>
                <input
                  id="email"
                  type="email"
                  ref={username_ref}
                  required
                  //버튼비활성화
                  onChange={checkUsername}
                ></input>

                <MiniTitle>이메일로 아이디를 작성해주세요!</MiniTitle>
              </Input>

              <Input>
                <label htmlFor="password">PW</label>
                <input
                  id="password"
                  type="password"
                  ref={password_ref}
                  //버튼 비활성화
                  onChange={checkPw}
                  required
                ></input>
                <MiniTitle>3 ~ 10자 영문, 숫자 및 특수문자조합</MiniTitle>
              </Input>
              <Btn
                onClick={() => {
                  loginCheck();
                }}
                disabled={!username || !pw}
              >
                로그인
              </Btn>
              {/* 카카오로그인 버튼 */}
              <KaKaoBtn
                onClick={() =>
                  // window.location.replace("https://www.google.com/")
                  {
                    kakaoLogin();
                  }
                }
              >
                {/* <KaKaoBtn onClick={() => kakaoLogin()}> */}
                {/* <ButtoninnerText>카카오계정 로그인</ButtoninnerText> */}
                {/* <a href= "http://54.180.86.234/oauth2/authorization/kakao?redirect_uri=http://localhost:3000">카카오로그인</a> */}
                <a href= "http://54.180.86.234/oauth2/authorization/kakao">카카오로그인</a>
                {/* <ButtoninnerText href={KAKAO_AUTH_URL}>
                  카카오계정 로그인
                </ButtoninnerText> */}
              </KaKaoBtn>
              <button
                onClick={() =>
                  window.open(
                    "http://54.180.86.234/oauth2/authorization/naver?redirect_uri=http://localhost:3000",
                    "_blank"
                  )
                }
              >
                네이버계정 로그인
              </button>
            </SignupWrap>
          </main>
        </section>
      ) : null}
    </div>
  );
};

const SignupTitle = styled.h1`
  color: #ff8a3a;
  font-size: 25px;
`;

const SignupHeader = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
`;

const SignupWrap = styled.div`
  background-color: whitesmoke;
  height: 90%;
  width: 90%;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 20px;
  color: #ff8a3a;
  font-size: 1.2rem;
  width: 70%;
  label {
    text-align: left;
  }
  input {
    width: 100%;
    height: 30px;
    border: none;
    background-color: whitesmoke;
    border-bottom: 2px solid #f7d9c6;
    font-size: 18px;
  }
  & input:focus {
    outline: none;
    border-bottom: 2px solid #ff8a3a;
  }
  button {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #ff8a3a;
    height: 50%;
    width: 30%;
    color: white;
  }
`;
const Address = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: green;
  div {
  }
`;
const MiniTitle = styled.p`
  margin-top: 10px;
  color: #999494;
  font-size: 12px;
  text-align: left;
`;

const Btn = styled.button`
  border: none;
  border-color: white;
  width: 30%;
  margin-top: 20px;
  height: 50px;
  font-size: 1.2rem;
  // 버튼 비활성화
  background-color: ${(props) => (props.disabled ? "#f8cbac" : "#ff8a3a")};
  color: white;
`;

const KaKaoBtn = styled.button`
  border: "none";
  border-radius: "9px";
  font-size: "17px";
  width: "284px";
  font-weight: "500";
  height: "32px";
  cursor: "pointer";
  background-color: "#fae101";
  align-items: "center";
  display: "flex";
  justify-content: "center";
  padding: "4px 0px";
`;

const ButtoninnerText = styled.a`
  margin: 0;
  font-size: 14px;
`;
export { ModalSignup, ModalLogin };
