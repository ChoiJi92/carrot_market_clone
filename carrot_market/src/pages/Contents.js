import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Contents = () => {
  const data = useSelector((state) => state.content.content_list);
  console.log(data);
  const [region, setRegion] = useState();
  const regionChange = (e) => {
    setRegion(e.target.value);
  };
  return (
    <Wrap>
      <h1>중고거래 인기매물</h1>
      <Nav>
        <select onChange={regionChange} value={region}>
          <option value="default">지역을 선택하세요</option>
          <option value="서울특별시">서울특별시</option>
          <option value="부산광역시">부산광역시</option>
          <option value="대구광역시">대구광역시</option>
          <option value="인천광역시">인천광역시</option>
          <option value="광주광역시">광주광역시</option>
          <option value="대전광역시">대전광역시</option>
          <option value="울산광역시">울산광역시</option>
          <option value="세종특별자치시">세종특별자치시</option>
          <option value="충청북도">충청북도</option>
          <option value="충청남도">충청남도</option>
          <option value="전라북도">전라북도</option>
          <option value="전라남도">전라남도</option>
          <option value="경상북도">경상북도</option>
          <option value="경상남도">경상남도</option>
          <option value="제주특별자치도">제주특별자치도</option>
        </select>
      </Nav>
      <CardList>
        {data.map((v) => (
          <Card key={v.id}>
            <img src={v.imageFile}></img>
            <h2>{v.title}</h2>
            <div>{v.address}</div>
            <div>좋아요</div>
            <div>댓글</div>
          </Card>
        ))}
      </CardList>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: 100vh;
  /* background-color: green; */
  /* padding-top: 150px; */

  h1 {
    padding-top: 150px;
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 30px;
    width: 100%;
    text-align: center;
  }
`;
const Nav = styled.nav`
  width: 80%;
  text-align: right;
  margin-bottom: 30px;
  select {
    border: 1px solid;
    border-radius: 5px;
    padding: 10px;
    width: 15%;
    height: 50px;
  }
`;
const CardList = styled.div`
  width: 80%;
  height: 300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* grid-template-rows: 1fr 1fr 1fr 1fr; */
  grid-gap: 10px;
  img{
    border-radius: 10px;
    width: 250px;
    height: 250px;
    box-sizing: border-box;
  }
  
`;
const Card = styled.div`
width: 50%;
`;
export default Contents;
