import React from "react";
import styled from "styled-components";
const MainBottom = () => {
  return (
    <Wrap>
    <Container>
      <Home>
        <h1>
          이웃과 함께 하는
          <br />
          동네생활
        </h1>
        <p>우리 동네의 다양한 이야기를 이웃과 함께 나누어요.</p>
        <ul>
            <li>
                <div className="home"></div>
                <div style={{fontSize:'15px',fontWeight:'bold', margin:'10px 0', textAlign:'left'}}>우리동네질문</div>
                <div style={{fontSize:'13px',textAlign:'left'}}>궁금한 게 있을 땐 이웃에게 물어보세요.</div>
            </li>
            <li>
                <div className="list"></div>
                <div style={{fontSize:'15px',fontWeight:'bold',margin:'10px 0',textAlign:'left'}}>동네분실센터</div>
                <div style={{fontSize:'13px',textAlign:'left'}}>무언가를 잃어버렸을 때, 함께 찾을 수 있어요.</div>
            </li>
            <li>
                <div className="talk"></div>
                <div style={{fontSize:'15px',fontWeight:'bold',margin:'10px 0',textAlign:'left'}}>동네모임</div>
                <div style={{fontSize:'13px',textAlign:'left'}}>관심사가 비슷한 이웃과 온 오프라인으로 만나요.</div>
            </li>
        </ul>
      </Home>
      <HomeImage>
        <img src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-2-f286322ab98acedf914a05bf77e84c67dcb897c8ccb543e66f6afea9d366d06d.png"></img>
      </HomeImage>
    </Container>
    </Wrap>
  );
};
const Wrap = styled.div`
background-color: #e6f3e6;
`
const Container = styled.div`
  width: 75%;
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
  /* white-space: nowrap; */
  h1 {
    margin-bottom: 10px;
    text-align: left;
  }
  p {
    text-align: left;
    margin-bottom: 20px;
  }
  button {
    width: 30%;
    height: 50px;
    font-size: large;
    border-radius: 5px;
    border: none;
    background-color: #f1f3f5;
  }
  ul{
    margin-top:10px;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  li{
    margin-right: 49px;
  }
  .home{
    background-image: url('https://d1unjqcospf8gs.cloudfront.net/assets/home/main/icon-story-1-9226479b836cdc960291ffda91ace46c90a632f6cc868aa8983b3624e662a924.svg');
    width: 56px;
    height: 56px;
    background-size: 56px 56px;
    
  }
  .list{
    background-image: url('https://d1unjqcospf8gs.cloudfront.net/assets/home/main/icon-story-2-208bb88cad31e335b40bc8ac5b7684dcf8a36d77ac50770a497a9c967a3bfc4f.svg');
    width: 56px;
    height: 56px;
    background-size: 56px 56px;
  }
  .talk{
    background-image: url('https://d1unjqcospf8gs.cloudfront.net/assets/home/main/icon-story-3-0a14d64c6101a7271655747d8401b9f71506578f8a4c0640608074e977bbc7c0.svg');
    width: 56px;
    height: 56px;
    background-size: 56px 56px;
  }
`;
const HomeImage = styled.div`
  img {
    width: 532px;
    height: 684px;
  }
`;

export default MainBottom;
