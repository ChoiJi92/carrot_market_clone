import React from "react";
import styled from "styled-components";
const MainBottom2 = () => {
  return (
    <Container>
      <HomeImage>
        <img src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-3-0c8b631ac2294ac5a3b3e7a3a5580c3e68a3303ad2aded1e84aa57a2e1442786.png"></img>
      </HomeImage>
      <Home>
        <h1>
          내 근처에서 찾는
          <br />
          동네가게
        </h1>
        <p>
         우리 동네 가게를 찾고 있나요?
         <br/>
         동네 주민이 남긴 진짜 후기를 함께 확인해보세요!
        </p>
        {/* <button></button> */}
        <a href='https://town.daangn.com/'>당근마켓 동네가게 찾기</a>
      </Home>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 760px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;

`;

const Home = styled.div`
  /* width: 50%; */
  font-size: 1.5rem;
  line-height: 1.3;
  letter-spacing: -0.4px;
  display: flex;
  flex-direction: column;
  margin: 0 100px;
  white-space: nowrap;
  h1 {
    margin-bottom: 10px;
    text-align: left;
  }
  p {
    text-align: left;
    margin-bottom: 20px;
  }
  button{
    width: 50%;
    height: 50px;
    font-size: large;
    border-radius: 5px;
    border: none;
    background-color: #F1F3F5;
    cursor: pointer;
  }
  a{
    width: 50%;
    height: 50px;
    padding: 14px;
    font-size: large;
    border-radius: 5px;
    border: none;
    background-color: #F1F3F5;
    cursor: pointer;
    color: black;
    text-decoration: none;
    text-align: center;
    :hover{
        background-color:#bdbdbd;
    }
  }
`;
const HomeImage = styled.div`
  img {
    width: 532px;
    height: 684px;
  }
`;

export default MainBottom2;
