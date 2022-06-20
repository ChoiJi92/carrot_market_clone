import React, { useState } from 'react';
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import {
  deleteCommentDB,
  updateCommentDB,
} from "../redux/modules/commentSlice";
const Comment = ({data}) => {
    const dispatch = useDispatch();
    const nickname = localStorage.getItem('nickname')
  const [isedit, setIsedit] = useState(false);
  const [input, setInput] = useState(data.comment);
//   const [date, setDate] = useState(data.createAt);
const commentChange=(e) => {
    setInput(e.target.value)
}
const onKeyPress = (e) => {
    if (e.key === "Enter") {
      updateComment();
    }
  };
  const updateComment = () => {
    dispatch(
      updateCommentDB({
        postId: data.postId,
        commentId: data.commentId,
        comment: input,
        nickname: nickname,
      })
    );
    setIsedit(false);
  };
    return (
        <List key={data.id}>
        <div className="nickname">{data.nickname}</div>
        {!isedit ? (
          <>
            <div className="comment">{input}</div>
            {/* <div className="date">{date}</div> */}
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
                        postId: data.postId,
                        commentId: data.commentId,
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
  /* width: 90%; */
  /* margin: 0 auto; */
  .nickname {
    width: 7%;
  }
  .comment {
    width: 60%;
  }
  /* .date {
    width: 15%;
  } */
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
    width: 50%;
    height: 70%;
    margin-left: 10px;
    cursor: pointer;
  }
`;

export default Comment;