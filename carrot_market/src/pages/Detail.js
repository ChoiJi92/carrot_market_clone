import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CardSlide from "../components/CardSlide";
import { loadDetailContentDB } from "../redux/modules/contentSlice";

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch()
  const [isloaded, setIsloaded] = useState(false);
  const data = useSelector((state) => state.content.detail_list)

  useEffect(() => {
    async function detailLoad() {
      await dispatch(loadDetailContentDB(params.id));
      // await dispatch(loadCommentDB(params.id));
      setIsloaded(true);
    }
    detailLoad();
  }, []);
  return (
    <>
    {isloaded && (
      <>
      <CardSlide image={data.imageFile}></CardSlide>
      <Container>
        <Profile>
          <p style={{ fontSize: "20px", fontWeight: "600" }}>닉네임</p>
          <p style={{ fontSize: "18px" }}>{data.address}</p>
        </Profile>
        <Content>
          <h1>{data.title}</h1>
          <p style={{ color: "#868e96", fontSize: "15px", marginTop: "4px" }}>
            작성날짜
          </p>
          <p style={{ marginTop: "4px", fontSize: "16px", fontWeight: "bold" }}>
          {data.price}
          </p>
          <div>{data.content}</div>
          <div>
            <p>좋아요0개 ∙ 댓글0개</p>
          </div>
        </Content>
        <Comment>
          <input placeholder="댓글을 입력해 주세요 :)"></input>
          <button>등록</button>
        </Comment>
      </Container>
      </>
    )
}
    </>
  );
};

const Container = styled.div`
  width: 50%;
  margin: 50px auto;
`;
const Profile = styled.div`
  padding-bottom: 13px;
  border-bottom: 1px solid #e9ecef;
  p{
    margin-bottom: 10px;
  }

`;
const Content = styled.div`
  margin-top: 20px;
  padding-bottom: 13px;
  border-bottom: 1px solid #e9ecef;
  h1{
    margin-bottom: 5px;
  }
  p{
    margin-bottom: 10px;
    font-size: 17px;
  }
  div{
    margin-top: 10px;
    font-size: 17px;
    p{
      font-size: 13px;
      color: #868e96;
    }
  }
`;
const Comment = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 30px;
  input{
    width: 90%;
  }
  button{
    width: 8%;
    background-color: #ff8a3a;
    border: none;
    border-radius: 5px;
    color: white;
  }
`;
export default Detail;
