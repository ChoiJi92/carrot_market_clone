import React, { useCallback } from "react";
import styled from "styled-components";
import "../assets/css/modal.css";

import instance from "../shared/axios";
import { useDispatch } from "react-redux";
import { loginUserDB } from "../redux/modules/userSlice";

import useGeolocation from "react-hook-geolocation";
//Signup Modal
const ModalSignup = (props) => {
  const username_ref = React.useRef(null);
  const password_ref = React.useRef(null);
  const passwordCheck_ref = React.useRef(null);
  const nickname_ref = React.useRef(null);

  // 모달 열기, 닫기를 부모로부터 받아옴
  const { open, close } = props;

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

  //아이디, 이메일, 비밀번호, 비밀번호 확인
  const [username, setUsername] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [address, setAddress] = React.useState("");

  //오류메시지 상태저장
  const [usernameMessage, setUsernameMessage] = React.useState("");
  const [nicknameMessage, setNicknameMessage] = React.useState("");
  const [passwordMessage, setPasswordMessage] = React.useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    React.useState("");

  // 유효성 검사
  const [isUsername, setIsUsername] = React.useState(false);
  const [isNickname, setIsNickname] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);

  //회원가입 데이터 서버에 보내기!
  const SignupAxios = async () => {
    // 서버에 보내줄 데이터들
    let users = {
      username: username_ref.current.value,
      nickname: nickname_ref.current.value,
      password: password_ref.current.value,
      address: address,
    };

    await instance
      //서버에 users 인풋 값 보내주기
      // .post("http://54.180.86.234:8080/user/signup", users)
      .post("/user/signup", users)
      //성공시 리스폰스 받아옴
      .then((response) => {
        // console.log(response);
        window.alert("회원가입 성공");
        close();
      })
      //실패시 에러메시지 받아옴, 작성한 벨리데이션 문구도 같이
      .catch(function (error) {
        // console.log(error);
        //회원가입 실패 시 에러메시지 alert
        window.alert(error.response.data.message);
      });
  };

  // username
  const onChangeUsername = useCallback((e) => {
    const usernameRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const usernameCurrent = username_ref.current.value;
    setUsername(usernameCurrent);

    if (!usernameRegex.test(usernameCurrent)) {
      setUsernameMessage("이메일 형식을 다시 한번 확인해 주세요.");
      setIsUsername(false);
    } else {
      setUsernameMessage("알맞게 작성되었습니다 :)");
      setIsUsername(true);
    }
  }, []);

  // nickname
  const onChangeNickname = useCallback((e) => {
    const nicknameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{3,10}$/;
    //닉네임은 3~8자 한글,영어,숫자
    const nicknameCurrent = nickname_ref.current.value;
    setNickname(nicknameCurrent);

    if (!nicknameRegex.test(nicknameCurrent)) {
      setNicknameMessage("닉네임은 3~8자 한글,영어,숫자");
      setIsNickname(false);
    } else {
      setNicknameMessage("알맞게 작성되었습니다 :)");
      setIsNickname(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[0-9a-zA-Z@$!%*#?&]{3,10}$/;
    //비밀번호는 3 ~ 10자 영문, 숫자 및 특수문자조합으로
    const passwordCurrent = password_ref.current.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("비밀번호는 3 ~ 10자 영문, 숫자 및 특수문자조합으로");
      setIsPassword(false);
    } else {
      setPasswordMessage("알맞게 작성되었습니다 :)");
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = passwordCheck_ref.current.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 :)");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호를 다시 한번 확인해 주세요.");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );
  const messageReset = () => {
    setUsernameMessage(false);
    setNicknameMessage(false);
    setPasswordMessage(false);
    setPasswordConfirm(false);
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
                messageReset();
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
                  onChange={onChangeUsername}
                  required
                ></input>
                <MiniTitle>
                  {username.length > 0 && (
                    <span
                      className={`message ${isUsername ? "success" : "error"}`}
                    >
                      {usernameMessage}
                    </span>
                  )}
                </MiniTitle>
              </Input>
              <Input>
                <label htmlFor="nickName">NickName</label>
                <input
                  id="nickName"
                  type="name"
                  ref={nickname_ref}
                  //버튼비활성화
                  onChange={onChangeNickname}
                  required
                ></input>
                <MiniTitle>
                  {nickname.length > 0 && (
                    <span
                      className={`message ${isNickname ? "success" : "error"}`}
                    >
                      {nicknameMessage}
                    </span>
                  )}
                </MiniTitle>
              </Input>
              <Input>
                <label htmlFor="password">PW</label>
                <input
                  id="password"
                  type="password"
                  ref={password_ref}
                  //버튼비활성화
                  onChange={onChangePassword}
                  required
                ></input>
                <MiniTitle>
                  {password.length > 0 && (
                    <span
                      className={`message ${isPassword ? "success" : "error"}`}
                    >
                      {passwordMessage}
                    </span>
                  )}
                </MiniTitle>
              </Input>
              <Input>
                <label htmlFor="confirmPassword">PW CHECK</label>
                <input
                  id="confirmPassword"
                  type="password"
                  ref={passwordCheck_ref}
                  //버튼비활성화
                  onChange={onChangePasswordConfirm}
                  required
                ></input>
                <MiniTitle>
                  {passwordConfirm.length > 0 && (
                    <span
                      className={`message ${
                        isPasswordConfirm ? "success" : "error"
                      }`}
                    >
                      {passwordConfirmMessage}
                    </span>
                  )}
                </MiniTitle>
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
                disabled={
                  !(
                    isNickname &&
                    isUsername &&
                    isPassword &&
                    isPasswordConfirm &&
                    username &&
                    nickname &&
                    password &&
                    passwordConfirm &&
                    address
                  )
                }
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

  //아이디, 이메일, 비밀번호, 비밀번호 확인
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  //오류메시지 상태저장
  const [usernameMessage, setUsernameMessage] = React.useState("");
  const [passwordMessage, setPasswordMessage] = React.useState("");

  // 유효성 검사
  const [isUsername, setIsUsername] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);

  // username
  const onChangeUsername = useCallback((e) => {
    const usernameRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const usernameCurrent = username_ref.current.value;
    setUsername(usernameCurrent);

    if (!usernameRegex.test(usernameCurrent)) {
      setUsernameMessage("이메일 형식을 다시 한번 확인해 주세요.");
      setIsUsername(false);
    } else {
      setUsernameMessage("알맞게 작성되었습니다 :)");
      setIsUsername(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[0-9a-zA-Z@$!%*#?&]{3,10}$/;
    //비밀번호는 3 ~ 10자 영문, 숫자 및 특수문자조합으로
    const passwordCurrent = password_ref.current.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("비밀번호는 3 ~ 10자 영문, 숫자 및 특수문자조합으로");
      setIsPassword(false);
    } else {
      setPasswordMessage("알맞게 작성되었습니다 :)");
      setIsPassword(true);
    }
  }, []);
  //모달창 x아이콘으로 닫을 때 전에 메신지 남는 현상 제거
  const messageReset = () => {
    setPasswordMessage(false);
    setUsernameMessage(false);
  };

  //모듈로 로그인 정보 전송
  const loginCheck = () => {
    let users = {
      username: username_ref.current.value,
      password: password_ref.current.value,
    };
    //dispatch 할 때 users 데이터와 close 함수 전달 (함수전달 가능, 함수 전달 할 땐 괄호 없어야함.)
    dispatch(loginUserDB(users));
  };
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;

  //엔터키 꼽기
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      loginCheck();
    }
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
                messageReset();
              }}
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
                  onChange={onChangeUsername}
                ></input>
                <MiniTitle>
                  {username.length > 0 && (
                    <span
                      className={`message ${isUsername ? "success" : "error"}`}
                    >
                      {usernameMessage}
                    </span>
                  )}
                </MiniTitle>
              </Input>

              <Input>
                <label htmlFor="password">PW</label>
                <input
                  id="password"
                  type="password"
                  ref={password_ref}
                  //버튼 비활성화
                  onChange={onChangePassword}
                  onKeyPress={onKeyPress}
                  required
                ></input>
                <MiniTitle>
                  {password.length > 0 && (
                    <span
                      className={`message ${isPassword ? "success" : "error"}`}
                    >
                      {passwordMessage}
                    </span>
                  )}
                </MiniTitle>
              </Input>
              <Btn
                onClick={() => {
                  loginCheck();
                }}
                //버튼 비활성화
                disabled={!(isUsername && isPassword && username && password)}
              >
                로그인
              </Btn>
              {/* 카카오로그인 버튼 */}
              <KakaoBtn>
                <img
                  src="https://t1.daumcdn.net/cfile/tistory/99792D425D0895002A"
                  alt="kakao"
                  width="20px"
                  height="20px"
                  size="cover"
                  position="center"
                  radius="3px"
                />
                <ButtoninnerText href="http://54.180.86.234/oauth2/authorization/kakao">
                  카카오계정 로그인
                </ButtoninnerText>
              </KakaoBtn>
              {/* 네이버로그인 버튼 */}
              <NaverBtn>
                <img
                  src="data:image/jpeg;base64,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"
                  alt="kakao"
                  width="20px"
                  height="20px"
                  size="cover"
                  position="center"
                  radius="3px"
                />
                <ButtoninnerText href="http://54.180.86.234/oauth2/authorization/naver">
                  네이버계정 로그인
                </ButtoninnerText>
              </NaverBtn>
              {/* 구글로그인 버튼 */}
              <GoogleBtn>
                <img
                  src="data:image/png;base64,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"
                  alt="kakao"
                  width="20px"
                  height="20px"
                  size="cover"
                  position="center"
                  radius="3px"
                />
                <ButtoninnerText href="http://webprogramming-mj6119.shop/oauth2/authorization/google">
                  구글계정 로그인
                </ButtoninnerText>
              </GoogleBtn>

              {/* <button
                onClick={() =>
                  window.open(
                    "http://54.180.86.234/oauth2/authorization/naver"
                    // "http://54.180.86.234/oauth2/authorization/naver?redirect_uri=http://localhost:3000",
                  )
                }
              >
                네이버계정 로그인
              </button>
              <button
                onClick={() =>
                  window.open(
                    "http://webprogramming-mj6119.shop/oauth2/authorization/google"
                  )
                }
              >
                구글 로그인
              </button> */}
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
  .message.error {
    color: red;
  }
  .message.success {
    color: blue;
  }
`;

const Btn = styled.button`
  border: none;
  border-color: white;
  border-radius: 5px;
  width: 30%;
  margin-top: 20px;
  height: 40px;
  font-size: 1.2rem;
  // 버튼 비활성화
  background-color: ${(props) => (props.disabled ? "#f8cbac" : "#ff8a3a")};
  color: white;
`;

const KakaoBtn = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #fae101;
  width: 70%;
  margin-top: 10px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const NaverBtn = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #1bd900;
  width: 70%;
  margin-top: 10px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const GoogleBtn = styled.button`
  border: none;
  border-radius: 5px;
  background-color: white;
  width: 70%;
  margin-top: 10px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtoninnerText = styled.a`
  margin: 0;
  font-size: 14px;
  a:link {
    color: black;
  }
  a:visited {
    color: black;
  }
  text-decoration: none; ;
`;
export { ModalSignup, ModalLogin };
