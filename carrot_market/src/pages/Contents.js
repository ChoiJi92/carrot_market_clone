import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { orange } from "@mui/material/colors";
import Like from "../components/Like";

const Contents = () => {
  const data = useSelector((state) => state.content.content_list);
  const navigate = useNavigate();
  console.log(data);
  const [region, setRegion] = useState();
  const regionChange = (e) => {
    setRegion(e.target.value);
  };
  const color = orange[500];
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
          <Card key={v.postID}>
            <img
              src={v.imagefile}
              onClick={() => {
                navigate(`/detail/${v.postID}`);
              }}
            ></img>
            <h2>{v.title}</h2>
            <div>{v.price}</div>
            <div>{v.address}</div>
            <LikeCnt>
              <div>
                <span>좋아요0개</span>
                <span>댓글{v.commentCnt}개</span>
              </div>
              <Like></Like>
            </LikeCnt>
          </Card>
        ))}
      </CardList>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          backgroundColor: color,
          position: "fixed",
          bottom: "10px",
          right: "10px",
        }}
        onClick={() => {
          navigate("/write");
        }}
      >
        <AddIcon />
      </Fab>
    </Wrap>
  );
};

const Wrap = styled.div`
  /* height: 100vh; */
  /* flex: 1; */
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
  width: 83%;
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
  margin: 0 auto;
  margin-bottom: 50px;
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
const Card = styled.div`
  margin-top: 20px;
  width: 19%;
  /* width: calc(70% - 44px); */
  left: 35px;
  img {
    border-radius: 10px;
    width: 100%;
    height: 250px;
    box-sizing: border-box;
    cursor: pointer;
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
const LikeCnt = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export default Contents;
