import React from 'react';
import styled from "@emotion/styled";
import Comment from "./Comment";
import { useSelector } from 'react-redux';
const CommentList = () => {
    const data = useSelector((state)=>state.comment.comment_list)
    return (
        <Container>
        {data.map(v => 
            <Comment key={v.commentID} data={v}></Comment>)}
        </Container>
    );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
 
`;
export default CommentList;