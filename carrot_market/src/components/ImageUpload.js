import React from 'react';
import styled from 'styled-components';
import { ImCancelCircle } from "react-icons/im";
const ImageUpload = ({image}) => {
    return (
        <Container>
            <ImCancelCircle size='20px' style={{position:'absolute', right:'0',cursor:'pointer'}}></ImCancelCircle>
            <img src={image}></img>
        </Container>
    );
};

const Container = styled.div`
    width: 15%;
    height: 100%;
    border: 1px solid;
    border-radius: 5px;
    position: relative;
    img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

`
export default ImageUpload;