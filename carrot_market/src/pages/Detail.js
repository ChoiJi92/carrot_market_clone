import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CardSlide from "../components/CardSlide";
import { deleteContentDB, loadDetailContentDB } from "../redux/modules/contentSlice";
import profile from '../assets/css/profile.png'
import { createCommentDB } from "../redux/modules/commentSlice";
import CommentList from "../components/CommentList";

const Detail = () => {
  const params = useParams();
  const navigate =useNavigate()
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")
  const [isloaded, setIsloaded] = useState(false);
  const data = useSelector((state) => state.content.detail_list)
  const username = localStorage.getItem('username')
  console.log('나는 디테일',data)
  const createComment=() => {
    dispatch(createCommentDB({
      postID:data.id,
      comment:comment
    }))
    setComment("")
  }
  const commentChange = (e) =>{
    setComment(e.target.value)
  }
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      createComment();
    }
  };
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
      <CardSlide image={data.imagefile}></CardSlide>
      <Container>
        <Profile>
          <div><img src={profile}></img></div>
          <div className="name">
          <p style={{ fontSize: "15px", fontWeight: "600" }}>{data.nickname}</p>
          <p style={{ fontSize: "15px" }}>서울특별시</p>
          </div>
        </Profile>
        <Content>
          <div className="title">
          <h1>{data.title}</h1>
          <div className="button">
            {username===data.username ? <>
              <button onClick={()=>{navigate(`/write/${data.id}`)}}>수정</button>
          <button onClick={()=>{
            dispatch(deleteContentDB(data.id))
          }}>삭제</button></> : <></>}
         
          </div>
          </div>
          <p style={{ color: "#868e96", fontSize: "15px", marginTop: "4px" }}>
            {data.modifiedAt}
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
          <input placeholder="댓글을 입력해 주세요 :)" value={comment} onChange={commentChange} onKeyPress={onKeyPress}></input>
          <button onClick={createComment}>등록</button>
        </Comment>
        <CommentList></CommentList>
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
  display: flex;
  flex-direction: row;
  align-items: center;
  p{
    margin-bottom: 5px;
  }
  img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  .name{
    margin-left: 8px;
  }
`;
const Content = styled.div`
  margin-top: 20px;
  padding-bottom: 13px;
  border-bottom: 1px solid #e9ecef;
  width: 100%;
  .title{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* align-items: center; */
    /* width: 70%; */
  }
  .button{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 10%;
    

    button{
      border: none;
      background-color: transparent;
      margin-left: 5px;
      font-size: medium;
      cursor: pointer;
      :hover{
        color:#ff8a3a;
      }
    }
  }
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
