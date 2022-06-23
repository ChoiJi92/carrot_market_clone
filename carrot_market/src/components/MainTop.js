import React from "react";
import styled from "styled-components";
const MainTop = () => {
  return (
    <Container>
      <Home>
        <h1>
          당신 근처의
          <br />
          당근마켓
        </h1>
        <p>
          중고 거래부터 동네 정보까지, 이웃과 함께해요.
          <br />
          가깝고 따뜻한 당신의 근처를 만들어요.
        </p>
      </Home>
      <HomeImage>
        <img src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-68ba12f0da7b5af9a574ed92ca8b3a9c0068db176b566dd374ee50359693358b.png"></img>
      </HomeImage>
    </Container>
  );
};

const Container = styled.div`
  /* min-width: 100%; */
  height: 760px;
  background-color: #fbf7f2;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-top: 73px;
`;

const Home = styled.div`
  /* width: 50%; */
  font-size: 1.5rem;
  line-height: 1.3;
  padding-top: 16rem;
  padding-left: 13rem;
  margin-bottom: 3.2rem;
  letter-spacing: -0.4px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  h1 {
    margin-bottom: 10px;
    text-align: left;
  }
  p {
    text-align: left;
  }
`;
const HomeImage = styled.div`
  img {
    bottom: 0;
    width: 804px;
    height: 685px;
  }
`;

export default MainTop;
