import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <Wrap>
        <Container>
            <Top></Top>
            <ul>
                <li>클론코딩 8조</li>
            </ul>
            <ul>
                <li>FrontEnd</li>
                <li style={{color:'#ADB5BD'}}>최지훈</li>
                <li style={{color:'#ADB5BD'}}>임준수</li>
            </ul>
            <ul>
                <li>BackEnd</li>
                <li style={{color:'#ADB5BD'}}>고승유</li>
                <li style={{color:'#ADB5BD'}}>김민지</li>
                <li style={{color:'#ADB5BD'}}>박종인</li>
            </ul>
        </Container>
        </Wrap>
    );
};
const Wrap = styled.footer`
background-color: #495057;

height: 250px;
/* position: relative; */

padding: 50px;

bottom: 0;

`
const Container = styled.div`
width: 60%;
margin: 0 auto;
display: flex;
flex-direction: row;
justify-content: space-between;
/* align-items: center; */
ul{
    list-style: none;
    color: white;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
li{
    margin-bottom: 10px;
    font-size: large;
    white-space: nowrap;
}
`
const Top =styled.div`
width: 130px;
height: 37px;
background-size: 130px 37px;
background-image: url('https://d1unjqcospf8gs.cloudfront.net/assets/home/base/footer/logo-a4f4848ffd1d5fcb13d1d3ecf82ffbc77c31ebe226f67097386497a34638c059.svg');
`
export default Footer;