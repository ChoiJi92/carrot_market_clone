import React from 'react';
import styled from 'styled-components';

const ImageUpload = ({image}) => {
    return (
        <Container>
            <img src={image}></img>
        </Container>
    );
};

const Container = styled.div`
    width: 15%;
    height: 100%;
    border: 1px solid;
    border-radius: 5px;
    img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

`
export default ImageUpload;