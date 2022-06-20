import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { orange } from "@mui/material/colors";

const Search = () => {
  const data = useSelector((state) => state.content.content_list);
  const navigate = useNavigate();
  console.log(data);
  const color = orange[500];
  return (
    <Wrap>
      <h1>중고거래 인기매물</h1>

      <CardList>
        {data.map((v) => (
          <Card
            key={v.id}
            onClick={() => {
              navigate(`/detail/${v.id}`);
            }}
          >
            <img src={v.imageFile}></img>
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
  position: relative;
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
export default Search;
