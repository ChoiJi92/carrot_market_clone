import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BestContent = () => {
    const data = useSelector((state)=>state.content.content_list).filter((v,i) => i < 7 )
    const navigate = useNavigate()
    console.log(data)
    return (
        <Wrap>
            <Container>
            <h1>중고거래 인기매물</h1>
            <CardList>
            {data.map((v) => (
          <Card
            key={v.postID}
            onClick={() => {
              navigate(`/detail/${v.postID}`);
            }}
          >
            <img src={v.imagefile}></img>
            <h2>{v.title}</h2>
            <div>{v.price}</div>
            <div>{v.address}</div>
            <div>
              <span>좋아요0개</span>
              <span>댓글0개</span>
            </div>
          </Card>
        ))}
        </CardList>
        <div className='more'>
        <a href="/contents">인기매물 더 보기</a>
        </div>
            </Container>

        </Wrap>
    );
};
const Wrap = styled.div`
background-color: #F8F9FA;
padding: 6rem 0;
`
const Container = styled.div`

h1{
    text-align: center;
    margin-bottom: 3rem;
    font-size: 3rem;
    line-height: 1.35;
    font-weight: 1000;
}
.more{
    text-align: center;
}
a{
    cursor: pointer;
    text-decoration: underline;
    font-size: 1rem !important;
    line-height: 1.5;
    letter-spacing: -0.3px;
    color: black;
}
`
const CardList = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 30px;
  
`;
const Card = styled.div`
  margin-top: 20px;
  width: 19%;
  /* width: calc(70% - 44px); */
  left: 35px;
  cursor: pointer;
  img {
    border-radius: 10px;
    width: 100%;
    height: 250px;
    box-sizing: border-box;
  }
  h2 {
    width: 100%;
    margin-top: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: normal;
  }
  div {
    margin-top: 10px;
  }
  span {
    margin-right: 10px;
    color: #868e96;
  }
`;
export default BestContent;