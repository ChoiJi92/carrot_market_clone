import { createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/axios";

// 해당 컨텐츠의 id를 받아서 해당 컨텐츠의 comment들 로드
export const loadCommentDB = (postID) => {
  return async function (dispatch) {
    await instance.get(`/api/posts/${postID}/comments`).then((response) => {
        dispatch(loadComment(response.data));
    });
  };
};
// comment 생성
export const createCommentDB = (data) => {
  return async function (dispatch) {
    await instance.post(`/api/posts/${data.postID}/comments`, data).then((response) => {

        dispatch(createComment(response.data));
    });
  };
};
// comment 수정
export const updateCommentDB = (data) => {
  
  return async function (dispatch){
    await instance.put(`/api/posts/${data.postID}/comments/${data.commentID}`, data).then((response)=>{
      console.log(response.data)  
      dispatch(updateComment(response.data))
    })
  }
}
// comment 삭제
export const deleteCommentDB = (data) => {
  return async function (dispatch){
    await instance.delete(`/api/posts/${data.postID}/comments/${data.commentID}`).then((response) => {
      dispatch(deleteComment(data.commentID))
    })
  }
}
const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment_list: [],
  },
  reducers: {
    loadComment: (state, action) => {
      state.comment_list = action.payload;
    },
    createComment: (state, action) => {
      state.comment_list.unshift(action.payload); // 배열의 앞에 추가하기위해서 unshift사용!
    },
    updateComment:(state, action) => {
      const index = state.comment_list.findIndex(
        (v) => v.id === action.payload.commentId
      );
      state.comment_list[index] = action.payload;
    },
    deleteComment: (state,action) =>{
      const new_comment = state.comment_list.filter(v => v.commentID !== action.payload )
      state.comment_list = new_comment
    }
  },
});

export const { loadComment, createComment,updateComment,deleteComment } = commentSlice.actions;
export default commentSlice.reducer;