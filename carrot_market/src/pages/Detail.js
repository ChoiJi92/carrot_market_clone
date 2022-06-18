import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import styled from "styled-components";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { useSelector } from "react-redux";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import 'swiper/swiper-bundle.min.css'
// import 'swiper/swiper.min.css'
// import 'swiper/components/navigation/navigation.min.css'
// import 'swiper/components/pagination/pagination.min.css'
SwiperCore.use([Navigation, Pagination]);
const Detail = () => {
  const data = useSelector((state) => state.content.content_list);
  return (
    <Container>
    <Swiper
    modules={[Navigation, Pagination]}
    spaceBetween={30} //SwiperSlide 간의 간격을 나타낸다.
    slidesPerView={1} //Swiper 한 번에 보여지는 slide 개수를 나타낸다.
    // scrollbar={{ draggable: true }} //slide를 드래그해서 넘길 수 있는 속성이다.
    centeredSlides
      onSlideChange={() => console.log("slide change")}
      onSwiper={swiper => console.log(swiper)}
    navigation
    pagination={{ clickable: true }}
    // breakpoints={{  //반응형을 구현하기 위해서 breakpoints를 둘 수 있다.
    //   768: {
    //     slidesPerView: 7,
    //   },
    // }}
  >{data.map((v)=> 
    <SwiperSlide style={{width:'100%'}}><img src={v.imageFile}></img></SwiperSlide>)}
    {/* <SwiperSlide style={{backgroundColor:'black',height:'500px'}}></SwiperSlide>
    <SwiperSlide style={{backgroundColor:'yellow',height:'500px'}}></SwiperSlide>
    <SwiperSlide style={{backgroundColor:'red',height:'500px'}}></SwiperSlide>
    <SwiperSlide style={{backgroundColor:'blue',height:'500px'}}></SwiperSlide> */}
  </Swiper>
  </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  padding: 150px;
  img{
    border-radius: 20px;
    width:480px;
    height: 500px;
    margin-left: 27px;
  }
`
export default Detail;
