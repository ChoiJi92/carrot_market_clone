import styled from "styled-components";

const ContentsNotFound = () => {
  return (
    <NotFoundWrap>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk2YAmnih13lru0PfnjLYgprIpKJMInx4n1w&usqp=CAU"
        alt="당근"
      />
      <h1>게시글이 없습니다.</h1>
    </NotFoundWrap>
  );
};
const NotFoundWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 50vh;
  text-align: center;
  align-items: center;
  justify-content: center;
`;


export default ContentsNotFound;
