import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import instance from "../shared/axios";
import { orange } from "@mui/material/colors";
import styled from "styled-components";

const Like = ({ likeCnt, commentCnt,postID }) => {
  const [isloaded, setIsloaded] = useState(false);
  const [like_count, setLike_count] = useState(likeCnt);
  const [like, setLike] = useState();
  useEffect(() => {
    async function likeLoad() {
      await instance.get(`/like/${postID}`).then((response) => {
        console.log(response)
        setLike(response.data);
      });
      setIsloaded(true);
    }
    likeLoad();
  }, []);

  // 좋아요 추가
  const addLike = async () => {
    await instance.post(`/like/${postID}`);
    setLike_count(like_count + 1);
    setLike(false)
  };
  // 좋아요 취소
  const deleteLike = async () => {
    await instance.post(`/like/${postID}`);
    setLike_count(like_count - 1);
    setLike(true)
  };
  const color = orange[500];
  return (
    <>
      {isloaded && (
        <LikeCnt>
             <div>
                <p>좋아요{like_count}개 ∙ 댓글{commentCnt}개</p>
              </div>
          {like ? (
            <FavoriteBorderIcon
              onClick={addLike}
              fontSize="medium"
              cursor="pointer"
              style={{ color: color }}
            ></FavoriteBorderIcon>
          ) : (
            <FavoriteIcon
              style={{ color: color }}
              onClick={deleteLike}
              fontSize="medium"
              cursor="pointer"
            ></FavoriteIcon>
          )}
        </LikeCnt>
      )}
    </>
  );
};

const LikeCnt = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default Like;
