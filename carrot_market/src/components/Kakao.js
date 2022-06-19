import React from "react";
import styled from "styled-components";

const Kakao = () => {
  return (
    <>
      <KaKaoBtn>
        <ButtoninnerText>카카오계정 로그인</ButtoninnerText>
      </KaKaoBtn>
    </>
  );
};

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

const ButtoninnerText = styled.h3`
  margin: 0;
  font-size: 14px;
`;

export default Kakao;
