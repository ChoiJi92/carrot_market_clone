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
              {/* <button
                onClick={() =>
                  window.open(
                    "http://54.180.86.234/oauth2/authorization/naver?redirect_uri=http://localhost:3000",
                    "_blank"
                  )
                }
              >
                네이버계정 로그인
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
