import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { orange } from "@mui/material/colors";
import Like from "../components/Like";
import SearchNotFound from "../components/SearchNotFound";

const Search = () => {
  const params = useParams();
  const data = useSelector((state) => state.content.content_list).filter((v) =>
    v.address.includes(params.search)
  );
  const username = localStorage.getItem('username')
  const navigate = useNavigate();
  const color = orange[500];
  return (
    <Wrap>
      <Container>
        <p>인기 중고</p>
        {data.length !== 0 ? 
        <CardList>
          {data.map((v) => (
            <Card
              key={v.id}
            >
              <img src={v.imagefile[0]} onClick={() => {
                navigate(`/detail/${v.postID}`);
              }} alt=""></img>
              <h2>{v.title}</h2>
              <div style={{ color: "#868e96" }}>{v.address}</div>
              <div className="bottom">
              <div style={{ color: "#ff8a3d" }}>{v.price}원</div>
              <Like></Like>
              </div>
            </Card>
          ))}
        </CardList>
        :
        <SearchNotFound/>
            }
      </Container>
      {username && 
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
}
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: #f8f9fa;
  padding: 100px 0 40px 0;
 
`;
const Container = styled.div`
  width: 60%;
  padding: 0 40px;
  margin-bottom: 50px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin: 0 auto;
  margin-bottom: 20px;
  background: #fff;
  p {
    font-weight: 600;
    font-size: 18px;
    margin: 20px 85px;
  }
`;
const CardList = styled.div`
  width: 100%;
  margin: 0 auto;
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px; */
  /* display: flex; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  /* align-items: center; */
  /* justify-content: center;
  align-items: center; */
  gap: 30px;
`;
const Card = styled.div`
  margin-bottom: 10px;
  width: 25%;
  /* width: calc(70% - 44px); */
  left: 35px;
  img {
    border-radius: 10px;
    width: 100%;
    height: 200px;
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
    margin-top: 5px;
  }
  span {
    margin-right: 10px;
    color: #868e96;
  }
  .bottom{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
export default Search;
