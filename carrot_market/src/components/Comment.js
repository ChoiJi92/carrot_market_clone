import React, { useState } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import {
  deleteCommentDB,
  updateCommentDB,
} from "../redux/modules/commentSlice";
import { useParams } from "react-router-dom";
import profile from '../assets/css/profile.jpeg'

const Comment = ({ data }) => {
  const dispatch = useDispatch();
  const params = useParams()
  const nickname = localStorage.getItem("nickname");
  const [isedit, setIsedit] = useState(false);
  const [input, setInput] = useState(data.comment);
  //   const [date, setDate] = useState(data.createAt);
  const commentChange = (e) => {
    setInput(e.target.value);
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      updateComment();
    }
  };
  const updateComment = () => {
    dispatch(
      updateCommentDB({
        postID: params.id,
        commentID: data.commentID,
        comment: input,
        nickname: nickname,
      })
    );
    setIsedit(false);
  };
  return (
    <List key={data.commentID}>
        <img src={data.profileImage ? data.profileImage : profile} alt=""></img>
      <div className="nickname">{data.nickname}</div>
      {!isedit ? (
        <>
          <div className="comment">{input}</div>
          <div className="date">{data.modifiedAtComment?.slice(0,10)}</div>
          {nickname === data.nickname ? (
            <Btn>
              <button
                onClick={() => {
                  setIsedit(true);
                }}
              >
                수정
              </button>
              <button
                onClick={() =>
                  dispatch(
                    deleteCommentDB({
                      postID: params.id,
                      commentID: data.commentID,
                    })
                  )
                }
              >
                삭제
              </button>
            </Btn>
          ) : (
            <Btn></Btn>
          )}
        </>
      ) : (
        <>
          <input
            style={{ width: "75%", height: "45%" }}
            onChange={commentChange}
            value={input}
            onKeyPress={onKeyPress}
            autoFocus
          ></input>
          <Btn>
            <button
              onClick={() => {
                setIsedit(false);
              }}
            >
              취소
            </button>
            <button onClick={updateComment}>등록</button>
          </Btn>
        </>
      )}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-top: 10px;
  /* width: 90%; */
  /* margin: 0 auto; */
  .nickname {
    width: 7%;
  }
  .comment {
    width: 60%;
  }
  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 5px;
  }
  .date {
    width: 15%;
    text-align: right;
  }
`;
const Btn = styled.div`
  width: 10%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  & > * {
    border: none;
    border-radius: 5px;
    background-color: #ff8a3a;
    color:white;
    width: 50%;
    height: 70%;
    margin-left: 10px;
    cursor: pointer;
  }
`;

export default Comment;
