import React from "react";
import styled from "styled-components";

const Contents = () => {
  return (
    <Wrap>
      <h1>중고거래 인기매물</h1>
      <nav></nav>
      <CardList>

      </CardList>
    </Wrap>
  );
};

const Wrap = styled.div`


`
const CardList = styled.div`
  width: 30%;
  
`
export default Contents;
