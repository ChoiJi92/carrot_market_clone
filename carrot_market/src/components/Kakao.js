import React from "react";
import styled from "styled-components";
import KaKaoLogin from "react-kakao-login";

const Kakao = ({ oAuthLoginHandler }) => {
  return (
    <>
      <KaKaoLogin
        token={"c6f598807395f5b0e00db020204fa663"}
        buttonText="kakao"
        onSuccess={oAuthLoginHandler}
        onFail={console.error}
        onLogout={console.info}
        style={buttonBlock}
      >
        <ButtoninnerText>카카오 계정으로 로그인</ButtoninnerText>
      </KaKaoLogin>
    </>
  );
};

const buttonBlock = {
  border: "none",
  borderRadius: "9px",
  fontSize: "17px",
  width: "284px",
  fontWeight: "500",
  height: "32px",
  cursor: "pointer",
  background: "#fae101",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  padding: "4px 0px",
};

const ButtoninnerText = styled.h3`
  margin: 0;
  font-size: 14px;
`;

export default Kakao;
