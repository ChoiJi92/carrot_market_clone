import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ModalSignup, ModalLogin } from "../components/Modal"; //modal

const Header = () => {
  const navigate = useNavigate();

  const searchRef = React.useRef(null);
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchRef.current.value}`);
    }
  };

  //로그인 상태 로컬스토리에 토큰 유무로 확인(null, 토큰값)
  const users = localStorage.getItem("token");

  // 컴포넌트 렌더링 시 로그인 여부 체크
  // useEffect(() => {}, [user.isLogin]);

  //modal
  //modal창 useState로 열고 닫힘
  const [modalSignupOpen, setModalSignupOpen] = React.useState(false);
  const [modalLoginOpen, setModalLoginOpen] = React.useState(false);

  // 실행 시 modal창 state 변경
  const openSignupModal = () => {
    setModalSignupOpen(true);
  };
  const closeSignupModal = () => {
    setModalSignupOpen(false);
  };

  const openLoginModal = () => {
    setModalLoginOpen(true);
  };
  const closeLoginModal = () => {
    setModalLoginOpen(false);
  };

  // 로그아웃 시 토큰 삭제
  const deleteToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    localStorage.removeItem("username");
    localStorage.removeItem("profileImage");
    navigate("/");
    // window.location.reload();
  };

  return (
    <Container>
      <Logo>
        <LogoImg onClick={() => navigate("/")}>
          <Image
            style={{ height: "50px", width: "100px" }}
            src="https://d1unjqcospf8gs.cloudfront.net/assets/home/base/header/logo-basic-24b18257ac4ef693c02233bf21e9cb7ecbf43ebd8d5b40c24d99e14094a44c81.svg"
            alt="로고"
          ></Image>
        </LogoImg>
        <LogoItem onClick={() => navigate("/contents")}>중고거래</LogoItem>
      </Logo>

      <List>
        {
          <Search
            type="text"
            placeholder="물품이나 동네를 검색해보세요"
            ref={searchRef}
            onKeyPress={onKeyPress}
          ></Search>
        }
        {users && (
          <ProfileImage
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50px",
              marginLeft: "10px",
            }}
            src="data:image/jpeg;base64,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"
            alt="로고"
          ></ProfileImage>
        )}
        {users && <Title>{localStorage.getItem("nickname")}님</Title>}
        {users && <Item>당근채팅</Item>}
        {!users && <Item onClick={openLoginModal}>로그인</Item>}
        {!users && <Item onClick={openSignupModal}>회원가입</Item>}

        <ModalLogin open={modalLoginOpen} close={closeLoginModal}></ModalLogin>

        {users && <Item onClick={deleteToken}>로그아웃</Item>}

        <ModalSignup
          open={modalSignupOpen}
          close={closeSignupModal}
        ></ModalSignup>
      </List>
    </Container>
  );
};

//로고
const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 6vw;
`;
const LogoImg = styled.div`
  width: 50px;
  padding: 10px;
  margin-left: 1vw;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Image = styled.img`
  width: 110px;
  height: 180px;
`;
const LogoItem = styled.div`
  margin-left: 80px;
  font-size: 16px;
  color: #ff8a3a;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #cccccc;
  }
`;
const Search = styled.input`
  width: 230px;
  height: 40px;
  text-align: left;
  padding: 9px 12px;
  border: none;
  border-radius: 5px;
  background-color: #f2f3f6;
  &::placeholder {
    color: #8a8f98;
  }
`;

const ProfileImage = styled.img``;
const List = styled.div`
  margin-right: 6vw;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  height: 40px;
  width: 77px;
  border-radius: 3px;
  outline: 1px solid #d3d3d4;
`;

const Title = styled.div`
  color: black;
  font-size: 16px;
  font-weight: bolder;
  margin-left: 10px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  position: fixed;
  width: 100%;
  height: 8vh;
  z-index: 100;
  padding-top: 0.5vw;
  @media (max-width: 499px) {
    /* padding: 30px; */
  }
  @media (min-width: 500px) {
    /* padding: 25px; */
  }
  ${List} {
    display: flex;
    align-items: center;
  }
  ${Item} {
    border: 1px black;
    margin-left: 10px;
    font-size: 16px;
    font-weight: bold;
    color: black;

    cursor: pointer;
    &:hover {
      color: #cccccc;
      background-color: #fcfafa;
    }
  }
`;

export default Header;
