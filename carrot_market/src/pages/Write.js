import React, { useState } from "react";
import styled from "styled-components";
import { BsFillCameraFill, BsLayoutSidebarReverse } from "react-icons/bs";
import { useParams } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";

const Write = () => {
  const params = useParams();
  const [region, setRegion] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [price, setPrice] = useState();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  // 이미지 미리보기 기능 구현
  const uploadImage = (e) => {
    let reader = new FileReader(); // 이미지 미리보기!!!
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPreview(reader.result);
    };
    setImage(e.target.files[0]);
  };
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const contentChange = (e) => {
    setContent(e.target.value);
  };
  const regionChange = (e) => {
    setRegion(e.target.value);
  };
  const priceChange = (e) => {
    setPrice(e.target.value);
  };
  return (
    <Container>
      <h1>{!params.id ? "중고거래 글쓰기" : "글 수정하기"}</h1>
      <ImageContainer>
          <label htmlFor="image"> <BsFillCameraFill size="35px"></BsFillCameraFill></label>
          <input
            className="image"
            id='image'
            type="file"
            multiple
            accept="image/*"
            onChange={uploadImage}
          ></input>
        <ImageUpload image={preview}></ImageUpload>
      </ImageContainer>
      <input
        id="title"
        className="title"
        placeholder="글 제목"
        onChange={titleChange}
      ></input>
      <Nav>
        <select onChange={regionChange} value={region}>
          <option value="default">지역을 선택하세요</option>
          <option value="서울특별시">서울특별시</option>
          <option value="부산광역시">부산광역시</option>
          <option value="대구광역시">대구광역시</option>
          <option value="인천광역시">인천광역시</option>
          <option value="광주광역시">광주광역시</option>
          <option value="대전광역시">대전광역시</option>
          <option value="울산광역시">울산광역시</option>
          <option value="세종특별자치시">세종특별자치시</option>
          <option value="충청북도">충청북도</option>
          <option value="충청남도">충청남도</option>
          <option value="전라북도">전라북도</option>
          <option value="전라남도">전라남도</option>
          <option value="경상북도">경상북도</option>
          <option value="경상남도">경상남도</option>
          <option value="제주특별자치도">제주특별자치도</option>
        </select>
      </Nav>
      <input
        className="price"
        placeholder="₩ 가격"
        type="number"
        onChange={priceChange}
      ></input>
      <textarea
        className="content"
        onChange={contentChange}
        placeholder="게시글 내용을 작성해주세요(가품 및 판매금지품목은 게시가 제한될 수 있어요.)"
      ></textarea>
      {!params.id ? (
        <Btn disabled={!title || !preview || !content || !price || !region}>
          등록 하기
        </Btn>
      ) : (
        <Btn disabled={!title || !preview || !content || !price || !region}>
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
    height: 300px;
  }
  button {
    border-radius: 5px;
    border: none;
    height: 30px;
    width: 20%;
  }
`;
const Btn = styled.button`
  background-color: ${(props) => (props.disabled ? "#FFFFCC" : "#F5BD25")};
  border-radius: 5px;
  border: none;
  height: 30px;
  width: 20%;
  cursor: pointer;
`;
const ImageContainer = styled.div`
  width: 80%;
  height: 150px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  label{
    border-radius: 5px;
    border: 1px solid;
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 30px;
  }
  input {
    display: none;
    color: transparent;
  }
`;
const Nav = styled.nav`
  width: 80%;
  margin-bottom: 30px;
  select {
    border: 1px solid;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    height: 50px;
  }
`;
export default Write;
