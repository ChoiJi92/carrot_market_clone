import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const MainMiddle = () => {
    const navigate =useNavigate()
  return (
    <Container>
      <HomeImage>
        <img src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-1-39ac203e8922f615aa3843337871cb654b81269e872494128bf08236157c5f6a.png"></img>
      </HomeImage>
      <Home>
        <h1>
          우리 동네
          <br />
          중고 직거래 마켓
        </h1>
        <p>
          동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.
        </p>
        <button onClick={()=>{navigate('/contents')}}>매물 보기</button>
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
  h1 {
    margin-bottom: 10px;
    text-align: left;
  }
  p {
    text-align: left;
    margin-bottom: 20px;
  }
  button{
    width: 30%;
    height: 50px;
    font-size: large;
    border-radius: 5px;
    border: none;
    background-color: #F1F3F5;
    cursor: pointer;
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

export default MainMiddle;
