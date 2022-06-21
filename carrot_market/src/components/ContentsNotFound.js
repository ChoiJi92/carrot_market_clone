import styled from "styled-components";

const ContentsNotFound = () => {
  return (
    <NotFoundWrap>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk2YAmnih13lru0PfnjLYgprIpKJMInx4n1w&usqp=CAU"
        alt="당근"
      />
      <Title>게시글이 없습니다.</Title>
    </NotFoundWrap>
  );
};
const NotFoundWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 80vh;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin-top: 10vh;
`;
export default ContentsNotFound;
