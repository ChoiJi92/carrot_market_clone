import React, { useState } from "react";
import styled from "styled-components";
import { BsFillCameraFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createContentDB,
  updateContentDB,
} from "../redux/modules/contentSlice";
import { ImCancelCircle } from "react-icons/im";
const Write = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const username = localStorage.getItem("username");
  const nickname = localStorage.getItem("nickname");
  const address = localStorage.getItem("address");
  const post = useSelector((state) => state.content.content_list).filter(
    (v) => v.postID === Number(params.id)
  );
  // const [region, setRegion] = useState(post[0]?.address);
  const [title, setTitle] = useState(post[0]?.title);
  const [content, setContent] = useState(post[0]?.content);
  const [price, setPrice] = useState(post[0]?.price);
  const [preview, setPreview] = useState(
    post[0]?.imagefile ? post[0]?.imagefile : []
  );
  const [prevImage, setPrevImage] = useState(post[0]?.imagefile);
  const [image, setImage] = useState([]);
  // 이미지 미리보기 기능 구현
  const uploadImage = (e) => {
    let imagelist = [];
    let filelist = [];
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i]);
      filelist[i] = e.target.files[i];
      let reader = new FileReader(); // 이미지 미리보기!!!
      reader.readAsDataURL(e.target.files[i]);
      reader.onload = () => {
        imagelist[i] = reader.result;
        setPreview([...preview, ...imagelist]);
      };
    }
    setImage([...filelist]);
    e.target.value = "";
  };
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const contentChange = (e) => {
    setContent(e.target.value);
  };
  // const regionChange = (e) => {
  //   setRegion(e.target.value);
  // };
  const priceChange = (e) => {
    setPrice(e.target.value)
    // setPrice(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    // setPrice(e.target.value.toLocaleString('ko-KR'));
  };
  // 데이터 formData로 보내기
  const addContent = async () => {
    const formData = new FormData();
    image.forEach((file) => formData.append("file", file));

    const data = {
      username: username,
      nickname: nickname,
      title: title,
      price: price,
      content: content,
      address: address,
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("contents", blob);

    dispatch(createContentDB(formData));
  };
  const updateContent = async () => {
    const formData = new FormData();
    image.forEach((file) => formData.append("file", file));

    const data = {
      // username: username,
      // nickname: nickname,
      imagefile: prevImage,
      title: title,
      price: price,
      content: content,
      address: address,
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("contents", blob);
    dispatch(updateContentDB(formData, params.id));
  };
  return (
    <Container>
      <h1>{!params.id ? "중고거래 글쓰기" : "글 수정하기"}</h1>
      <ImageContainer>
        <label htmlFor="image">
          <BsFillCameraFill size="35px"></BsFillCameraFill>
          <p>
            {preview.length}
            <span>/5</span>
          </p>
        </label>
        <input
          className="image"
          id="image"
          type="file"
          multiple
          accept="image/*"
          onChange={uploadImage}
          // disabled={preview.length===5}
          onClick={(e) => {
            if (preview.length >= 5) {
              e.preventDefault();
              alert("사진은 최대 5장만 올릴 수 있어요 :)");
            }
          }}
        ></input>

        {preview &&
          preview.map((v, i) => (
            <Image key={Math.random()}>
              <ImCancelCircle
                onClick={() => {
                  setPreview(preview.filter((value, index) => index !== i));
                  setPrevImage(prevImage.filter((val, idx) => idx !== i));
                }}
                size="25px"
                style={{
                  position: "absolute",
                  right: "0",
                  cursor: "pointer",
                  color: "white",
                  mixBlendMode: "difference",
                }}
              ></ImCancelCircle>
              <img src={v} alt=""></img>
            </Image>
          ))}
      </ImageContainer>
      <input
        id="title"
        className="title"
        placeholder="글 제목"
        onChange={titleChange}
        value={title ? title : ""}
      ></input>
      <input
        className="price"
        placeholder="₩ 가격"
        // type="number"
        onChange={priceChange}
        value= {price ? price : ""}
      ></input>
      <input id="region" className="region" value={address} readOnly></input>
      <textarea
        className="content"
        onChange={contentChange}
        value={content}
        placeholder="게시글 내용을 작성해주세요(가품 및 판매금지품목은 게시가 제한될 수 있어요.)"
      ></textarea>
      {!params.id ? (
        <Btn
          disabled={!title || preview.length === 0 || !content || !price}
          onClick={addContent}
        >
          등록 하기
        </Btn>
      ) : (
        <Btn
          disabled={!title || preview.length === 0 || !content || !price}
          onClick={updateContent}
        >
          수정 하기
        </Btn>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding-top: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  h1 {
    margin-bottom: 50px;
  }
  input {
    width: 80%;
    margin-bottom: 20px;
    border: none;
    outline: none;
    border-bottom: 1px solid;
    padding-bottom: 20px;
  }
  .title {
    font-size: large;
  }
  .region {
    font-size: medium;
    padding-bottom: 15px;
  }
  .price {
    ::-webkit-outer-spin-button,  // number input에 오른쪽 화살표 없애는 css
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  textarea {
    width: 80%;
    margin-bottom: 20px;
    height: 250px;
    padding: 20px;
  }
  button {
    border-radius: 5px;
    border: none;
    height: 30px;
    width: 20%;
  }
`;
const Image = styled.div`
  width: 15%;
  height: 100%;
  position: relative;
  margin-right: 30px;
  img {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    /* background-color: gray; */
  }
`;
const Btn = styled.button`
  background-color: ${(props) => (props.disabled ? "#f8cbac" : "#ff8a3a")};
  border-radius: 5px;
  border: none;
  height: 30px;
  width: 20%;
  margin-bottom: 20px;
  cursor: pointer;
`;
const ImageContainer = styled.div`
  width: 80%;
  height: 170px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  label {
    border-radius: 5px;
    border: 1px solid;
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 30px;
  }
  input {
    display: none;
    color: transparent;
  }
  p {
    margin-top: 5px;
    color: #ff8a3a;
  }
  span {
    color: black;
  }
`;
// const Nav = styled.nav`
//   width: 80%;
//   margin-bottom: 30px;
//   select {
//     border: 1px solid;
//     border-radius: 5px;
//     padding: 10px;
//     width: 100%;
//     height: 50px;
//   }
// `;
export default Write;
